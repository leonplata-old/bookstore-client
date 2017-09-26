import './book-editor.style.scss';
import autobind from 'autobind-decorator'
import { IScope, IQService, IPromise } from 'angular';
import { Inject, inject, NgComponent, NgOnInit } from 'angular-ts';
import { IBooksService, IAuthorsService } from '../../interfaces/services';
import { IBook, IAuthor, FormState, IAuthorSelection, IBookAuthorAssociation } from '../../interfaces/entities';

export interface CalendarState {
  open: boolean;
}

@NgComponent({
  selector: 'tt-book-editor',
  template: require('./book-editor.template.html'),
  bindings: { bookId: '<' }
})
@Inject(['$scope', '$q',  'BooksService', 'AuthorsService'])
export class BookEditorComponent implements NgOnInit {

  DUMMY_BOOK_ID: number = 1;

  $scope: IScope;
  $q: IQService;
  BooksService: IBooksService;
  AuthorsService: IAuthorsService;
  calendarState: CalendarState;
  bookId: number;
  formState: FormState;
  prevFormState: FormState;
  authors: IAuthor[];

  title: string;
  edition: Date;

  constructor (...args: any[]) {
    inject(this, args);

    this.calendarState = { open: false }
    this.formState = {
      selections: []
    };
    this.prevFormState = {
      selections: []
    }
  }

  @autobind
  propagateBook (book: IBook): void {
    this.$scope.$broadcast('book-ready', book);
  }

  @autobind
  handleError (err: Error): void {
    alert(err.message);
  }

  $onInit () : void {
    this.$q.all([
      this.AuthorsService.getAuthors(),
      this.BooksService.getBookById(this.DUMMY_BOOK_ID),
    ])
      .then(([{ authors }, book]) => {
        this.title = book.title;
        this.edition = book.edition_date;
        this.authors = authors;
        this.prevFormState.selections = this.createAuthorSelection(book.authors, authors);
        this.formState.selections = this.prevFormState.selections.map(selection => ({...selection}));
      })
      .catch(this.handleError); // A better non-blocking error handler is needed;
  }

  createAuthorSelection (takenAuthors: IAuthor[] = [], authors: IAuthor[] = []): IAuthorSelection[] {
    const takenAuthorsMap = takenAuthors.reduce((map: any, author: IAuthor) => {
      map[author.id_author] = author;
      return map;
    }, {});
    return authors.map(author => {
      return {
        author,
        selected: takenAuthorsMap[author.id_author] !== undefined,
      }
    });
  }

  openCalendar () {
    this.calendarState.open = true;
  }

  updateAssociations (): IPromise<any> {
    const addedIds: number[] = [];
    const removedIds: number[] = [];

    for (let i = 0; i < this.formState.selections.length; i++) {
      if (this.formState.selections[i] === this.prevFormState.selections[i]) {
        continue;
      }
      const selection = this.formState.selections[i];
      const ids = selection.selected ? addedIds : removedIds;
      ids.push(selection.author.id_author);
    }

    this.prevFormState.selections = this.formState.selections.map(selection => ({...selection}));
    return this.BooksService.associateAuthors(this.DUMMY_BOOK_ID, { add: addedIds, remove: removedIds })
  }

  updateBook (): IPromise<any> {
    return this.BooksService.updateBookById(this.DUMMY_BOOK_ID, {
      title: this.title,
      edition_date: this.edition,
    });
  }

  submit () {
    this.$q.all([ this.updateBook(), this.updateAssociations() ])
      .then(() => console.log('updated'))
      .catch(this.handleError);
  }
}
