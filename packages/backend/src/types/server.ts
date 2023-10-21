import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest
} from 'fastify';

export type Server = FastifyInstance;

export type Request<T = {}> = FastifyRequest<{
  Body: T;
}>;

export type Reply = FastifyReply;

export type PluginCallback = FastifyPluginCallback;
