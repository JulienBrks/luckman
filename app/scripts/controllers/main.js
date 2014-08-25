'use strict';

/**
 * @ngdoc function
 * @name luckyManApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the luckyManApp
 */
angular.module('luckyManApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
