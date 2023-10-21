import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const createUserSchema = z.object({
  id: z.string(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['ADMIN', 'USER']).optional()
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema
});
