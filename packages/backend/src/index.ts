import fastify from 'fastify';
import userRoutes from './modules/user/user.route';
import admin from 'firebase-admin';
import swagger from '@fastify/swagger';
import cors from '@fastify/cors';
import swaggerUi from '@fastify/swagger-ui';
import swaggerOptions from './utils/swagger_options';
import swaggerUiOptions from './utils/swagger_ui_options';

// Start Firebase Admin SDK
admin.initializeApp();

const server = fastify({ logger: true });
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const host = '0.0.0.0';

// Cors
server.register(cors);

// Test
server.get('/', (request, reply) => {
  reply.send({ status: 'You have reached the root' });
});

// Register swagger documentation
server.register(swagger, swaggerOptions);
server.register(swaggerUi, swaggerUiOptions);

// Register routes
server.register(userRoutes, { prefix: '/api/user' });

const main = async () => {
  await server.ready();
  server.swagger();

  // Start server
  server.listen({ port, host }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`ClubsNEU API running on ${address}`);
  });
};

main();
