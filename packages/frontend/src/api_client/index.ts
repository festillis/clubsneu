import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { SomeAuthenticatedRouteResponse } from './api_response_types';

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
    // someAuthenticatedRoute: (token: string) => {
    someAuthenticatedRoute: () => {
      return this.req<SomeAuthenticatedRouteResponse>({
        method: 'POST',
        url: '/user/someAuthenticatedRoute'
        // headers: { Authorization: `Bearer ${token}` }
      });
    }
  };

  private async req<T>(config: AxiosRequestConfig): Promise<T> {
    const res = await this.axios.request(config);

    if (res.status != 200) {
      throw new Error(res.statusText);
    }

    return res.data as T;
  }
}
