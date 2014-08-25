'use strict';

/**
 * @ngdoc function
 * @name luckyManApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the luckyManApp
 */
angular.module('luckyManApp')
  .controller('IndexCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
