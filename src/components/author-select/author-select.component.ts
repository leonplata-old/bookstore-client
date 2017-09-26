import './author-select.style.scss';

import { NgComponent } from 'angular-ts';
import { IAuthorsService } from '../../interfaces/services';
import { FormState } from '../../interfaces/entities';

@NgComponent({
  selector: 'tt-author-select',
  template: require('./author-select.template.html'),
  bindings: { formState: '<' },
})
export class AuthorSelectComponent {

  formState: FormState;
}
