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
      '$scope', '$http', '$filter', '$window', 'fileUpload',
      function ($scope, $http, $filter, $window, fileUpload) {
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
  ])
  // .directive('ngUploadForm', ['$rootScope', 'fileUpload', function () {
  //   return {
  //     restrict: 'E',
  //     templateUrl: './templates/fileform.html',
  //     scope: {
  //       allowed: '@',
  //       url: '@',
  //       autoUpload: '@',
  //       sizeLimit: '@',
  //       ngModel: '=',
  //       name: '@'
  //     },
  //     controller: function ($rootScope, $scope, $element, fileUpload) {
  //       $scope.$on('fileuploaddone', function (e, data) {
  //         fileUpload.addFieldData($scope.name, data._response.result.files[0].result);
  //       });

  //       $scope.options = {
  //         url: $scope.url,
  //         dropZone: $element,
  //         maxFileSize: $scope.sizeLimit,
  //         autoUpload: $scope.autoUpload
  //       };
  //       $scope.loadingFiles = false;

  //       if (!$scope.queue) {
  //         $scope.queue = [];
  //       }

  //       var generateFileObject = function generateFileObjects(objects) {
  //         angular.forEach(objects, function (value, key) {
  //           var fileObject = {
  //             name: value.filename,
  //             size: value.length,
  //             url: value.url,
  //             thumbnailUrl: value.url,
  //             deleteUrl: value.url,
  //             deleteType: 'DELETE',
  //             result: value
  //           };

  //           if (fileObject.url && fileObject.url.charAt(0) !== '/') {
  //             fileObject.url = '/'+fileObject.url;
  //           }

  //           if (fileObject.deleteUrl && fileObject.deleteUrl.charAt(0) !== '/') {
  //             fileObject.deleteUrl = '/'+fileObject.deleteUrl;
  //           }

  //           if (fileObject.thumbnailUrl && fileObject.thumbnailUrl.charAt(0) !== '/') {
  //             fileObject.thumbnailUrl = '/'+fileObject.thumbnailUrl;
  //           }

  //           $scope.queue[key] = fileObject;
  //         });
  //       };
  //       fileUpload.registerField($scope.name);
  //       $scope.filequeue = fileUpload.fieldData[$scope.name];

  //       $scope.$watchCollection('filequeue', function (newval) {
  //         generateFileObject(newval);
  //       });
  //     }
  //   };
  //   }])
  // .controller('FileDestroyController', ['$rootScope', '$scope', '$http', 'fileUpload', function ($rootScope, $scope, $http, fileUpload) {
  //   var file = $scope.file,
  //     state;

  //   if ($scope.$parent && $scope.$parent.$parent && $scope.$parent.$parent.$parent.name) {
  //     $scope.fieldname = $scope.$parent.$parent.$parent.name;
  //   }

  //   if (!fileUpload.fieldData[$scope.name]) {
  //     fileUpload.fieldData[$scope.name] = [];
  //   }

  //   $scope.filequeue = fileUpload.fieldData;

  //   if (file.url) {
  //     file.$state = function () {
  //       return state;
  //     };
  //     file.$destroy = function () {
  //       state = 'pending';
  //       return $http({
  //         url: file.deleteUrl,
  //         method: file.deleteType
  //       }).then(
  //         function () {
  //           state = 'resolved';
  //           fileUpload.removeFieldData($scope.fieldname, file.result._id);
  //           $scope.clear(file);
  //         },
  //         function () {
  //           state = 'rejected';
  //           fileUpload.removeFieldData($scope.fieldname, file.result._id);
  //           $scope.clear(file);
  //         }
  //       );


  //     };
  //   } else if (!file.$cancel && !file._index) {
  //     file.$cancel = function () {
  //       $scope.clear(file);
  //     };
  //   }
  // }]);
