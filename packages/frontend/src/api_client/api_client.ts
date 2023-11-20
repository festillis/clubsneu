import Axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import { Safe } from '~/types/safe';
import { APIErrors } from './types';

type Config = Omit<AxiosRequestConfig, 'method' | 'url'>;

export class APIClient {
  private readonly axios: AxiosInstance;
  private readonly accessToken?: string;
  private readonly getAccessToken:
    | (() => Promise<string | undefined | null>)
    | (() => string | undefined | null);

  constructor(
    baseURL: string,
    getAccessToken:
      | (() => Promise<string | undefined | null>)
      | (() => string | undefined | null),
    accessToken?: string
  ) {
    this.axios = Axios.create({
      baseURL,
      headers: {
        'content-type': 'application/json'
      }
    });
    this.accessToken = accessToken;
    this.getAccessToken = getAccessToken;
  }

  /**
   * For authenticated requests
   */
  public async authReq<T>(
    method: Method,
    url: string,
    config?: Config
  ): Promise<Safe<T>> {
    // if (!this.accessToken) {
    //   console.error('No access token found');
    //   return {
    //     hasError: true,
    //     errorText: APIErrors.token_not_found
    //   };
    // }

    const token = await this.getAccessToken();

    if (!token) {
      console.error('No token found');
      return {
        hasError: true,
        errorText: APIErrors.token_not_found
      };
    }

    return this.req<T>(method, url, {
      ...config,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  /**
   * For unauthenticated requests
   */
  public async req<T>(
    method: Method,
    url: string,
    config?: Config
  ): Promise<Safe<T>> {
    try {
      const res = await this.axios.request({
        method,
        url,
        ...config
      });

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
}
