import { Request, Reply } from '../../types/server';
import { CreateUserInput, CreateUserResponse } from './user.schema';
import { createUser } from './user.service';

export const someAuthenticatedHandler = async (
  request: Request,
  reply: Reply
) => {
  return reply.send({ message: "You're authenticated!" });
};

export const createUserHandler = async (
  request: Request<CreateUserInput>,
  _: Reply
): Promise<CreateUserResponse> => {
  const user = await createUser(request.body);
  return user;
};
