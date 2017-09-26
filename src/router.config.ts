import { ILocationProvider } from 'angular';
import { UrlRouterProvider, StateProvider } from '@uirouter/angularjs';
import { Inject, inject } from 'angular-ts';

Inject([
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
])(RouterConfig)

export function RouterConfig (
  $locationProvider: ILocationProvider,
  $urlRouterProvider: UrlRouterProvider,
  $stateProvider: StateProvider,
) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('editor', {
      url: '/editor',
      component: 'ttBookEditor',
    });

  $urlRouterProvider.otherwise('/editor');
}