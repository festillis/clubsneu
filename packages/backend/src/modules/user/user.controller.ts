import { Request, Reply } from '../../types/server';

const someAuthenticatedHandler = async (request: Request, reply: Reply) => {
  return reply.send({ message: "You're authenticated!" });
};

export default someAuthenticatedHandler;
