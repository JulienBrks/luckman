'use strict';

/**
 * @ngdoc function
 * @name luckyManApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the luckyManApp
 */
angular.module('luckyManApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
