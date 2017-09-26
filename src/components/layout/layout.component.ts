import { NgComponent } from 'angular-ts';

require('./layout.style.scss');

@NgComponent({
  selector: 'tt-layout',
  transclude: true,
  template: require('./layout.template.html'),
})
export class LayoutComponent { }