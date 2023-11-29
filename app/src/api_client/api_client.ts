import Axios, { AxiosInstance, Method } from 'axios';
import { Safe } from '~/types/safe';
import { Config } from './types';

export class ApiClient {
  private readonly axios: AxiosInstance;

  constructor(baseURL?: string) {
    this.axios = Axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * For authenticated requests
   */
  public async authReq<T>(
    method: Method,
    accessToken: string,
    config?: Config
  ): Promise<T> {
    return this.req<T>(method, {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  /**
   * For unauthenticated requests
   */
  public async req<T>(method: Method, config?: Config): Promise<T> {
    const res = await this.axios.request({
      method,
      ...config
    });

    return res.data as T;
  }
}
