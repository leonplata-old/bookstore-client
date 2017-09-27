import './book-editor.style.scss';
import autobind from 'autobind-decorator'
import { IScope, IQService, IPromise, ITimeoutService } from 'angular';
import { StateParams, StateService } from '@uirouter/angularjs';
import { Inject, inject, NgComponent, NgOnInit } from 'angular-ts';
import { IBooksService, IAuthorsService } from '../../interfaces/services';
import { IBook, IAuthor, IBookFormState, IAuthorAssociation,
  IBookAuthorAssociation, IDatePickerState } from '../../interfaces/entities';

const toObjectMap = (array: any[], property: string): any => {
  return array.reduce((map, item) => {
    map[item[property]] = item
    return map;
  }, {});
}

@NgComponent({
  selector: 'tt-book-editor',
  template: require('./book-editor.template.html'),
})
@Inject(['$scope', '$q', '$stateParams', '$state', '$timeout', 'BooksService', 'AuthorsService'])
export class BookEditorComponent implements NgOnInit {

  // INJECTED SERVICES
  $scope: IScope;
  $q: IQService;
  $stateParams: StateParams;
  $state: StateService;
  $timeout: ITimeoutService;
  BooksService: IBooksService;
  AuthorsService: IAuthorsService;

  // COMPONENT PROPERTIES
  bookId: number;
  state: IBookFormState;
  authors: IAuthor[];
  book: IBook;
  previousState: IBookFormState;
  datePickerState: IDatePickerState;
  toasterVisible: boolean;

  constructor (...args: any[]) {
    inject(this, args);

    this.toasterVisible = false;
    this.bookId = parseInt(this.$stateParams.bookId);
    this.datePickerState = { open: false }
    this.authors = [];
    this.book = {
      title: '',
      edition_date: new Date()
    };
    this.setState();
  }

  $onInit (): void {
    const fetchedResources: IPromise<any>[] = this.isValidBookId()
      ? [ this.fetchAuthors(), this.fetchCurrentBook() ]
      : [ this.fetchAuthors() ];

      this.$q.all(fetchedResources)
        .then(() => {
          this.setState();

          // WORKAROUND: setState is being called twice in order to set
          // the previous state equals to the current one, then the first
          // book update will not send unneccesary author ids to be removed.
          this.setState();
        })
        .catch(this.handleError);
  }

  openDatePicker (): void {
    this.datePickerState.open = true;
  }

  @autobind
  showToaster () {
    this.toasterVisible = true;
    this.$timeout(() => this.toasterVisible = false, 3000);
  }

  cancel (): void {
    this.$state.go('books');
  }

  submit (): IPromise<any> {
    const takenAction = this.isValidBookId() ? this.updateBook() : this.createBook();
    return takenAction.catch(this.handleError);
  }

  private isValidBookId () {
    return !Number.isNaN(this.bookId)
  }

  @autobind
  private handleError (err: Error): void {
    alert(err.message);
  }

  private fetchAuthors (): IPromise<any> {
    return this.AuthorsService.getAuthors()
      .then(({ authors }) => {
        this.authors = authors;
      });
  }

  private fetchCurrentBook (): IPromise<any> {
    return this.BooksService.getBookById(this.bookId)
      .then(book => this.book = book);
  }

  @autobind
  private setState () {
    this.previousState = this.state;
    this.state = {
      title: this.book.title,
      edition_date: this.book.edition_date,
      authorAssociations: this.createAuthorAssociations(),
    }
  }

  private createAuthorAssociations (): IAuthorAssociation[] {
    if (!this.book) {
      return this.authors.map((author) => ({ author, selected: false }));
    }
    const takenAuthors: IAuthor[] = this.book.authors || [];
    const takenAuthorsMap = toObjectMap(takenAuthors, 'id_author');
    const authorAssociations = this.authors.map((author) => {
      return {
        author,
        selected: takenAuthorsMap[author.id_author] !== undefined,
      };
    });
    return authorAssociations;
  }

  private createAssociationPayload (): any {
    const addedIds: number[] = [];
    const removedIds: number[] = [];

    for (let i = 0; i < this.state.authorAssociations.length; i++) {
      if (this.state.authorAssociations[i].selected === this.previousState.authorAssociations[i].selected) {
        continue;
      }
      const association = this.state.authorAssociations[i];
      const ids = association.selected ? addedIds : removedIds;
      ids.push(association.author.id_author);
    }

    return { add: addedIds, remove: removedIds };
  }

  @autobind
  private updateBookAssociations (): IPromise<any> {
    const associationDetail = this.createAssociationPayload();
    return this.BooksService.associateAuthors(this.bookId, associationDetail);
  }

  private updateBookFields (): IPromise<any> {
    const updatedBook: IBook = {
      title: this.state.title,
      edition_date: this.state.edition_date,
    };
    return this.BooksService.updateBookById(this.bookId, updatedBook)
      .then(book => this.book = book);
  }

  private updateBook (): IPromise<any> {
    return this.$q.all([ this.updateBookFields(), this.updateBookAssociations() ])
      .then(() => {
        this.setState();
        this.showToaster();

        // WORKAROUND: The server sometimes returns books without updated
        // authors, meanwhile the associations will be taken from the
        // previous state until it's fixed on server side.
        this.state.authorAssociations = this.previousState.authorAssociations;
      });
  }

  private createBook (): IPromise<any> {
    const newBook: IBook = {
      title: this.state.title,
      edition_date: this.state.edition_date,
    };
    return this.BooksService.createBook(newBook)
      .then((book) => {
        this.book = book;
        this.bookId = book.id_book || 0;
      })
      .then(this.updateBookAssociations)
      .then(this.refreshPage)
  }

  @autobind
  private refreshPage () {
    const stateParams = { bookId: this.book.id_book };
    this.$state.go(this.$state.current, stateParams, { reload: true });
  }
}
