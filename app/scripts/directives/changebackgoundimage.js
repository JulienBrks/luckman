'use strict';

/**
 * @ngdoc directive
 * @name luckyManApp.directive:changeBackgoundImage
 * @description
 * # changeBackgoundImage
 */
angular.module('luckyManApp')
  .directive('changeBackgroundImage', function () {
    return {
      template: '<span class="btn btn-default pull-right j-fileinput-button" ng-click="changeBackgroudImage()">\
                  <i class="glyphicon glyphicon-plus"></i>\
                  <span>修改壁纸</span>\
                  <input id="files" type="file">\
                 </span>\
      ',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
