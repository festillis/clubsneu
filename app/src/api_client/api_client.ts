import Axios, { AxiosInstance, Method } from 'axios';
import { Safe } from '~/types/safe';
import { Config } from './types';
import { clientAuth } from '~/firebase';

export class ApiClient {
  private readonly axios: AxiosInstance;

  constructor(baseURL?: string) {
    this.axios = Axios.create({
      baseURL,
      headers: {
        'content-type': 'application/json'
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
  ): Promise<Safe<T>> {
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
  public async req<T>(method: Method, config?: Config): Promise<Safe<T>> {
    try {
      const res = await this.axios.request({
        method,
        ...config
      });
      return { hasError: false, data: res.data as T };
    } catch (e) {
      return { hasError: true, errorText: (e as Error).message };
    }
  }
}
