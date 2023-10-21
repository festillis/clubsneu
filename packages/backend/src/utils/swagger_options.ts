import { SwaggerOptions } from '@fastify/swagger';

const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: 'ClubsNEU API',
      description: 'ClubsNEU API Documentation',
      version: '0.1.0'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
};

export default swaggerOptions;
