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
    'ngTouch',

    'blueimp.fileupload'
  ])
  .config([
      '$httpProvider', 'fileUploadProvider',
      function ($httpProvider, fileUploadProvider) {
          delete $httpProvider.defaults.headers.common['X-Requested-With'];
          fileUploadProvider.defaults.redirect = window.location.href.replace(
              /\/[^\/]*$/,
              '/cors/result.html?%s'
          );
          if (true) {
              // Demo settings:
              angular.extend(fileUploadProvider.defaults, {
                  // Enable image resizing, except for Android and Opera,
                  // which actually support image resizing, but fail to
                  // send Blob objects via XHR requests:
                  disableImageResize: /Android(?!.*Chrome)|Opera/
                      .test(window.navigator.userAgent),
                  maxFileSize: 5000000,
                  acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
              });
          }
      }
  ])
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
      .when('/index', {
        templateUrl: 'views/index.html',
        controller: 'IndexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('DemoFileUploadController', [
      '$scope', '$http', '$filter', '$window',
      function ($scope, $http) {
          $scope.options = {
              url: '//jquery-file-upload.appspot.com/'
          };
          if (!true) {
              $scope.loadingFiles = true;
              $http.get(url)
                  .then(
                      function (response) {
                          $scope.loadingFiles = false;
                          $scope.queue = response.data.files || [];
                      },
                      function () {
                          $scope.loadingFiles = false;
                      }
                  );
          }
      }
  ])

  .controller('FileDestroyController', [
      '$scope', '$http',
      function ($scope, $http) {
          var file = $scope.file,
              state;
          if (file.url) {
              file.$state = function () {
                  return state;
              };
              file.$destroy = function () {
                  state = 'pending';
                  return $http({
                      url: file.deleteUrl,
                      method: file.deleteType
                  }).then(
                      function () {
                          state = 'resolved';
                          $scope.clear(file);
                      },
                      function () {
                          state = 'rejected';
                      }
                  );
              };
          } else if (!file.$cancel && !file._index) {
              file.$cancel = function () {
                  $scope.clear(file);
              };
          }
      }
  ]);
