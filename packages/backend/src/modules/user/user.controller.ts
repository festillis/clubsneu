import { Request, Reply } from '../../types/server';
import verifyIdToken from '../../utils/verify_id_token';

const someAuthenticatedHandler = async (request: Request, reply: Reply) => {
  return reply.send({ message: "You're authenticated!" });
};

export default someAuthenticatedHandler;
