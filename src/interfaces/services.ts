import { IPromise } from 'angular';
import * as entities from './entities';

export interface IBooksService {
  getBooks (): IPromise<entities.IBookPagination>;
  getBookById (bookId: number): IPromise<entities.IBook>;
  updateBookById(bookId: number, newBook: entities.IBook): IPromise<entities.IBook>;
  associateAuthors (bookId: number, association: entities.IBookAuthorAssociation): IPromise<any>;
}

export interface IAuthorsService {
  getAuthors (): IPromise<entities.IAuthorPagination>;
}