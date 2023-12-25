import type { AxiosRequestConfig } from 'axios';

export type Config = Omit<AxiosRequestConfig, 'method'>;
