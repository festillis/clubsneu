import Axios, { AxiosInstance, Method } from 'axios';
import { Config } from './types';
import { authService } from '~/services';
import { isAuthenticated } from './middleware';

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
  public async authReq<T>(method: Method, config?: Config): Promise<T> {
    const accessToken = authService.getAccessToken();
    const provider = authService.getProvider();

    if (!accessToken || !provider || !isAuthenticated(accessToken, provider)) {
      throw new Error('Not authenticated');
    }

    return this.req<T>(method, {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-provider': provider
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
