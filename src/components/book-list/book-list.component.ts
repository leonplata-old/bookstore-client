import autobind from 'autobind-decorator'
import { IScope } from 'angular';
import { NgComponent, Inject, inject, NgOnInit } from 'angular-ts';
import { IBooksService } from '../../interfaces/services';
import { IBook, IDatePickerState } from '../../interfaces/entities';

export interface IBookListScope extends IScope {
  sortBy?: (property: string) => void;
}

export interface IBookSearchCriteria {
  title: string;
  edition_date?: Date;
  authors?: string;
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
  datePickerState: IDatePickerState;
  search: IBookSearchCriteria;

  constructor (...args: any[]) {
    inject(this, args);

    this.books = [];
    this.property = 'title'
    this.reverse = true;
    this.datePickerState = { open: false }
    this.search = { title: '' };
  }

  compareDates(a: Date, b: Date) {
    return (a.getFullYear() === b.getFullYear()) && (a.getMonth() === b.getMonth()) && (a.getDate() === b.getDate());
  }

  @autobind
  searchFilter(book: IBook, index: number, books: IBook[]) {
    const dateComparison = this.search.edition_date
      ? this.compareDates(book.edition_date, this.search.edition_date)
      : true;
    const authorsLength = book.authors ? book.authors.length : 0;
    const inputAuthorsLength = parseInt(this.search.authors || '');
    const authorComparison = Number.isNaN(inputAuthorsLength) ? true : authorsLength === inputAuthorsLength;
    return book.title.includes(this.search.title) && dateComparison && authorComparison;
  }

  $onInit () {
    this.BooksService.getBooks()
      .then(pagination => this.books = pagination.books)
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

  openDatePicker (): void {
    this.datePickerState.open = true;
  }
}