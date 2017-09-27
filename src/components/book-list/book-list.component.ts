import { IScope } from 'angular';
import { NgComponent, Inject, inject, NgOnInit } from 'angular-ts';
import { IBooksService } from '../../interfaces/services';
import { IBook } from '../../interfaces/entities';

export interface IBookListScope extends IScope {
  sortBy?: (property: string) => void;
}

@NgComponent({
  selector: 'tt-book-list',
  template: require('./book-list.template.html')
})
@Inject(['$scope', 'BooksService'])
export class BookListComponent implements NgOnInit {

  $scope: IBookListScope;
  BooksService: IBooksService;
  books: IBook[];
  property: string;
  reverse: boolean;


  constructor (...args: any[]) {
    inject(this, args);

    this.books = [];
    this.property = 'title'
    this.reverse = true;
  }

  $onInit () {
    this.BooksService.getBooks()
      .then(pagination => {
        this.books = pagination.books
        console.log(this.books)
      })
      .catch(err => alert(err));
  }

  sortBy (property: string): void {
    this.reverse = this.property === property ? !this.reverse : false;
    this.property = property;
  }

  getSortIcon (): any {
    return {
      'glyphicon-menu-down': this.reverse,
      'glyphicon-menu-up': !this.reverse,
    };
  }
}