import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SomeAuthenticatedRouteResponse } from './api_response_types';
import { Safe } from '~/types/safe';
import { token } from '~/stores/auth_store';

export class APIClient {
  private readonly baseURL: string = 'http://localhost:3001/api';

  private static instance: APIClient;
  private axios: AxiosInstance;

  private constructor() {
    this.axios = Axios.create({
      baseURL: this.baseURL,
      headers: { 'content-type': 'application/json' }
    });
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }

    return APIClient.instance;
  }

  /**
   * Authenticated routes
   */
  auth = {
    someAuthenticatedRoute: () => {
      return this.authReq<SomeAuthenticatedRouteResponse>({
        method: 'POST',
        url: '/user/someAuthenticatedRoute'
      });
    }
  };

  /**
   * For unauthenticated requests
   */
  private async req<T>(config: AxiosRequestConfig): Promise<Safe<T>> {
    try {
      const res = await this.axios.request(config);
      return {
        hasError: false,
        data: res.data as T
      };
    } catch (e) {
      console.error(e);
      return {
        hasError: true,
        errorText: (e as Error).message
      };
    }
  }

  /**
   * For authenticated requests
   */
  private async authReq<T>(config: AxiosRequestConfig): Promise<Safe<T>> {
    console.log(`Making authReq with token ${token()}`);

    return this.req<T>({
      ...config,
      headers: { Authorization: `Bearer ${token()}` }
    });
  }
}
