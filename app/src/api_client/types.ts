import type { AxiosRequestConfig } from 'axios';

export enum ApiError {
  token_not_found = 'token_not_found',
  invalid_credentials = 'invalid_credentials'
}

export type Config = Omit<AxiosRequestConfig, 'method'>;
export type AccessTokenGetter = () =>
  | Promise<string | null | undefined>
  | string
  | null
  | undefined;
