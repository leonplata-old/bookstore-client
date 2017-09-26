import { IHttpService, IPromise } from 'angular';
import { Inject, inject } from 'angular-ts';
import { IBook } from '../interfaces/entities';
import { IBooksService } from '../interfaces/services';

@Inject(['$http', 'API_URL',])
export class BooksService implements IBooksService {

  $http: IHttpService;
  API_URL: string;

  constructor(...args: any[]) {
    inject(this, args);
  }

  getBooks(): IPromise<IBook[]> {
    return this.$http
      .get(`${this.API_URL}/books`)
      .then(response => response.data) as IPromise<IBook[]>;
  }
}
