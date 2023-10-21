import { version } from '../../package.json';

/**
 * https://www.npmjs.com/package/@fastify/swagger-ui
 */

const swaggerUiOptions = {
  routePrefix: '/docs',
  staticCSP: true,
  version
};

export default swaggerUiOptions;
