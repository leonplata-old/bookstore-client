import "reflect-metadata";
import { ngRegister } from 'angular-ts';
import uiRouter from '@uirouter/angularjs';

import { RouterConfig } from './router.config';
import { BooksService } from './services/books.service';
import { AuthorsService } from './services/authors.service';

import { BookEditorComponent } from './components/book-editor/book-editor.component';
import { LayoutComponent } from './components/layout/layout.component';

export default ngRegister('app', [uiRouter])

  .constant('API_URL', 'http://192.168.31.252:8765')

  .config(RouterConfig)

  .service('BooksService', BooksService)
  .service('AuthorsService', AuthorsService)

  .component(BookEditorComponent)
  .component(LayoutComponent)

  .module();
