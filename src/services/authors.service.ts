import { IHttpService, IPromise } from 'angular';
import { Inject, inject } from 'angular-ts';
import { IAuthorPagination } from '../interfaces/entities';
import { IAuthorsService } from '../interfaces/services';

@Inject(['$http', 'API_URL',])
export class AuthorsService implements IAuthorsService {

  $http: IHttpService;
  API_URL: string;

  constructor(...args: any[]) {
    inject(this, args);
  }

  getAuthors(): IPromise<IAuthorPagination> {
    return this.$http
      .get(`${this.API_URL}/authors`, )
      .then(response => response.data) as IPromise<IAuthorPagination>;
  }
}
