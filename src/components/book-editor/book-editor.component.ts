import './book-editor.style.scss';
import { Inject, inject, NgComponent, NgOnInit } from 'angular-ts';
import { IBooksService, IAuthorsService } from '../../interfaces/services';
import { IBook } from '../../interfaces/entities';


@NgComponent({
  selector: 'tt-book-editor',
  template: require('./book-editor.template.html')
})
@Inject(['BooksService', 'AuthorsService'])
export class BookEditorComponent implements NgOnInit {

  BooksService: IBooksService;
  AuthorsService: IAuthorsService;

  constructor(...args: any[]) {
    inject(this, args);
  }

  $onInit() : void {

  }
}
