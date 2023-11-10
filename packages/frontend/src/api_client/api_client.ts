import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SomeAuthenticatedRouteResponse } from './api_response_types';
import { Safe } from '~/types/safe';
import { envVars } from '~/env';

export class APIClient {
  private readonly baseURL: string = `${envVars.API_CLIENT_BASE_URL}/api`;

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
    someAuthenticatedRoute: (token: string) => {
      return this.authReq<SomeAuthenticatedRouteResponse>(
        {
          method: 'POST',
          url: '/user/someAuthenticatedRoute'
        },
        token
      );
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
  private async authReq<T>(
    config: AxiosRequestConfig,
    token: string
  ): Promise<Safe<T>> {
    return this.req<T>({
      ...config,
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
