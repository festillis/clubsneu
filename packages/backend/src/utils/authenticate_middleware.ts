import { Reply, Request } from '../types/server';
import verifyIdToken from './verify_id_token';

const authenticateMiddleware = async (
  request: Request,
  reply: Reply,
  next: any
) => {
  const token = request.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    reply.code(401).send('Must provide a token');
    return;
  }

  const uid = await verifyIdToken(token);

  if (!uid) {
    reply.code(401).send('Invalid token');
    return;
  }
};

export default authenticateMiddleware;
