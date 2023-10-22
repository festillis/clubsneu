import { JsonSchema } from 'fastify-zod';
import { Server } from '../types/server';

// Register schemas
export const registerSchemas = (server: Server, schemas: Array<JsonSchema>) => {
  for (const schema of schemas) {
    server.addSchema(schema);
  }
};
