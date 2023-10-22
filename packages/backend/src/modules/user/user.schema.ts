import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const createUserSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
    invalid_type_error: 'ID must be a string'
  }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email({
      message: 'Email must be a valid email'
    }),
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string'
  }),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string'
  }),
  role: z
    .enum(['ADMIN', 'USER'], {
      invalid_type_error: 'Role must be either ADMIN or USER'
    })
    .optional()
});

const createUserResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['ADMIN', 'USER'])
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema
});
