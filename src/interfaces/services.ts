import { IPromise } from 'angular';
import { IBook, IAuthor } from './entities';

export interface IBooksService {
  getBooks(): IPromise<IBook[]>;
}

export interface IAuthorsService {
  getAuthors(): IPromise<IAuthor[]>;
}