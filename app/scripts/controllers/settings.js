'use strict';

/**
 * @ngdoc function
 * @name luckyManApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the luckyManApp
 */
angular.module('luckyManApp')
  .controller('SettingsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
