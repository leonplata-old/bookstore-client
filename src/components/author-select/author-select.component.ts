import './author-select.style.scss';

import { NgComponent, inject } from 'angular-ts';
import { IAuthorsService } from '../../interfaces/services';
import { IBookFormState } from '../../interfaces/entities';

@NgComponent({
  selector: 'tt-author-select',
  template: require('./author-select.template.html'),
  bindings: { formState: '<' },
})
export class AuthorSelectComponent {

  formState: IBookFormState;

  constructor (...args: any[]) {
    inject(this, args);
  }
}
