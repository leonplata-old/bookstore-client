import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import 'reflect-metadata';
import { ngRegister } from 'angular-ts';
import uiRouter from '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import { RouterConfig } from './config/router.config';
import { HttpConfig } from './config/http.config';

import { BooksService } from './services/books.service';
import { AuthorsService } from './services/authors.service';

import { BookEditorComponent } from './components/book-editor/book-editor.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthorSelectComponent } from './components/author-select/author-select.component';

export default ngRegister('app', [uiRouter, 'ui.bootstrap'])

  .constant('API_URL', 'http://ubuntu.local:8765/api')
  .constant('MAX_REQUEST_TIMEOUT_MS', 1000)

  .config(RouterConfig)
  .config(HttpConfig)

  .service('BooksService', BooksService)
  .service('AuthorsService', AuthorsService)

  .component(BookEditorComponent)
  .component(LayoutComponent)
  .component(AuthorSelectComponent)

  .module();
