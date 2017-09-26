import './book-editor.style.scss';
import { Inject, inject, NgComponent, NgOnInit } from 'angular-ts';
import { IBooksService, IAuthorsService } from '../../interfaces/services';
import { IBook } from '../../interfaces/entities';

export interface CalendarState {
  open: boolean;
}

@NgComponent({
  selector: 'tt-book-editor',
  template: require('./book-editor.template.html')
})
@Inject(['BooksService', 'AuthorsService'])
export class BookEditorComponent implements NgOnInit {

  BooksService: IBooksService;
  AuthorsService: IAuthorsService;
  calendarState: CalendarState;

  constructor (...args: any[]) {
    inject(this, args);

    this.calendarState = { open: false }
  }

  $onInit () : void {

  }

  openCalendar () {
    this.calendarState.open = true;
  }
}
