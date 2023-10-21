import { Server } from '../../types/server';
import authenticateMiddleware from '../../utils/authenticate_middleware';
import someAuthenticatedHandler from './user.controller';

const userRoutes = async (server: Server) => {
  server.post(
    '/someAuthenticatedRoute',
    {
      preHandler: [authenticateMiddleware]
    },
    someAuthenticatedHandler
  );
};

export default userRoutes;
