import { Request, Reply } from '../../types/server';
import verifyIdToken from '../../utils/verify_id_token';

const someAuthenticatedHandler = async (request: Request, reply: Reply) => {
  const token = request.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    reply.code(401).send('Invalid token');
    return;
  }

  const uid = await verifyIdToken(token);

  // Do something with uid
};

export default someAuthenticatedHandler;
