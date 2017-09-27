import { IHttpService, IPromise } from 'angular';
import { Inject, inject } from 'angular-ts';
import { IBook, IBookPagination, IBookAuthorAssociation } from '../interfaces/entities';
import { IBooksService } from '../interfaces/services';

@Inject(['$http', 'API_URL',])
export class BooksService implements IBooksService {

  $http: IHttpService;
  API_URL: string;

  constructor (...args: any[]) {
    inject(this, args);
  }

  private parseBook (rawBook: any) : IBook {
    return {
      id_book: rawBook.id_book,
      title: rawBook.title,
      edition_date: new Date(rawBook.edition_date),
      authors: rawBook.authors,
    }
  }

  private stringifyDate (date: Date) : string {
    return [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate(),
    ].join('-');
  }

  getBooks (): IPromise<IBookPagination> {
    return this.$http
      .get(`${this.API_URL}/books`)
      .then(response => response.data) as IPromise<IBookPagination>;
  }

  getBookById (bookId: number): IPromise<IBook> {
    return this.$http
      .get(`${this.API_URL}/books/${bookId}`)
      .then<IBook>((response) => {
        const rawBook = (response.data as any).book;
        return this.parseBook(rawBook);
      }) as IPromise<IBook>;
  }

  updateBookById(bookId: number, newBook: IBook): IPromise<IBook> {
    return this.$http
      .put(`${this.API_URL}/books/${bookId}`, {
        ...newBook,
        id_book: undefined,
        edition_date: this.stringifyDate(newBook.edition_date)
      })
      .then<IBook>((response) => {
        const rawBook = (response.data as any).book;
        return this.parseBook(rawBook);
      }) as IPromise<IBook>;
  }

  associateAuthors (bookId: number, association: IBookAuthorAssociation): IPromise<any> {
    return this.$http
      .patch(`${this.API_URL}/books/${bookId}/authors`, association)
      .then(response => response.data) as IPromise<any>;
  }

  createBook (newBook: IBook): IPromise<IBook> {
    return this.$http
      .post(`${this.API_URL}/books`, {
        ...newBook,
        id_book: undefined,
        edition_date: this.stringifyDate(newBook.edition_date)
      })
      .then<IBook>((response) => {
        const rawBook = (response.data as any).book;
        return this.parseBook(rawBook);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }) as IPromise<IBook>
  }
}
