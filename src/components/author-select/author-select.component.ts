import './author-select.style.scss';
import { Inject, inject, NgComponent, NgOnInit } from 'angular-ts';
import { IAuthorsService } from '../../interfaces/services';
import { IBook } from '../../interfaces/entities';


@NgComponent({
  selector: 'tt-author-select',
  template: require('./author-select.template.html')
})
@Inject(['AuthorsService'])
export class AuthorSelectComponent implements NgOnInit {

  AuthorsService: IAuthorsService;

  constructor(...args: any[]) {
    inject(this, args);
  }

  $onInit() : void {
    this.AuthorsService.getAuthors()
      .then(authors => console.log(authors));
  }
}
