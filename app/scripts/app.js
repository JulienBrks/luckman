'use strict';

/**
 * @ngdoc overview
 * @name luckyManApp
 * @description
 * # luckyManApp
 *
 * Main module of the application.
 */
angular
  .module('luckyManApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'

  ])
  .run(function ($rootScope, $location) {
    $rootScope.path = function () {
      return $location.path();
    }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
