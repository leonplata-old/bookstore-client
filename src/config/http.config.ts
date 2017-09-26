import angular, { IHttpProvider, IHttpInterceptor } from 'angular';
import { Inject, inject } from 'angular-ts';

Inject(['$httpProvider', 'API_URL'])(HttpConfig)

const interceptor = (API_URL: string) => (): IHttpInterceptor => {
  return {
    request (config) {
      if (config.url.startsWith(API_URL) && config.headers) {
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    }
  }
}

export function HttpConfig ($httpProvider: IHttpProvider, API_URL: string) {
  $httpProvider.interceptors.push(interceptor(API_URL));
}