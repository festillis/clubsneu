import { Server } from '../../types/server';
import authenticateMiddleware from '../../utils/authenticate_middleware';
import { createUserHandler, someAuthenticatedHandler } from './user.controller';
import { $ref } from './user.schema';

const userRoutes = async (server: Server) => {
  server.post(
    '/createUser',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          200: $ref('createUserResponseSchema')
        }
      },
      preHandler: [authenticateMiddleware]
    },
    createUserHandler
  );

  server.post(
    '/someAuthenticatedRoute',
    {
      preHandler: [authenticateMiddleware]
    },
    someAuthenticatedHandler
  );
};

export default userRoutes;
