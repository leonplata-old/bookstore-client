import { NgComponent, Inject, inject, NgOnInit } from 'angular-ts';
import { IBooksService } from '../../interfaces/services';
import { IBook } from '../../interfaces/entities';

@NgComponent({
  selector: 'tt-book-list',
  template: require('./book-list.template.html')
})
@Inject(['BooksService'])
export class BookListComponent implements NgOnInit {

  BooksService: IBooksService;
  books: IBook[];

  constructor (...args: any[]) {
    inject(this, args);
    this.books = [];
  }

  $onInit () {
    this.BooksService.getBooks()
      .then(pagination => this.books = pagination.books)
      .catch(err => alert(err));
  }
}