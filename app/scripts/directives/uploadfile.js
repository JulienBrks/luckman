'use strict';

/**
 * @ngdoc directive
 * @name luckyManApp.directive:uploadfile
 * @description
 * # uploadfile
 */
angular.module('luckyManApp')
  .directive('uploadfile', function ($interval) {
    return {
      scope: true,
      template: '<p class="text-center">\
                    <a class="btn btn-lg btn-success scroll-opt hide", href="javascript:void(0);", ng-click="startScroll()">开始\
                      <span class="glyphicon glyphicon-play"></span>\
                    </a>\
                    <a class="btn btn-lg btn-success scroll-opt hide", href="javascript:void(0);", ng-click="pauseScroll()">暂停\
                      <span class="glyphicon glyphicon-pause"></span>\
                    </a>\
                 </p>\
                 <span class="btn btn-success j-fileinput-button">\
                    <i class="glyphicon glyphicon-plus"></i>\
                    <span>添加文件</span>\
                    <input id="files" type="file" multiple />\
                 </span>\
                 <div id="links" class="hide"></div>\
                 <!-- The Gallery as inline carousel, can be positioned anywhere on the page -->\
                 <div id="blueimp-gallery-carousel" class="blueimp-gallery blueimp-gallery-carousel">\
                     <div class="slides"></div>\
                     <h3 class="title"></h3>\
                 </div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        /**
         * 等待一个promise数组里面的所有promise执行后, 返回一个promise
         *
         * @param {array} array - promise组成的数组
         * @return {array} 返回这个数组内的所有的promise执行后的结果
         */
        scope.deferArray = function(array){
          var deferred = $.Deferred();
          var fulfilled = 0, length = array.length;
          var results = [];

          if (length === 0) {
              deferred.resolve(results);
          } else {
              array.forEach(function(promise, i){
                  $.when(promise()).then(function(value) {
                      results[i] = value;
                      fulfilled++;
                      if(fulfilled === length){
                          deferred.resolve(results);
                      }
                  });
              });
          }
          return deferred.promise();
        };

        scope.imagesLoaded = false;

        element.find('#files').change(function(){
          var that = this;
          var loadImagePromises = [];
          var all = scope.deferArray;

          // 读取所有的文件, 创建一个loadImagePromises的数组用来存储所有的异步文件读取
          $.each(that.files, function(key, file) {
            loadImagePromises.push(function() {
              return $.Deferred(function(dfd) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function() {
                  var result = {
                    file: this.result,
                    name: file.name
                  }
                  dfd.resolve(result);
                }
              }).promise();
            });
          });

          // 执行所有异步文件读取, 然后创建图片链接的数组放到carouseLinksPromises中
          $.when(all(loadImagePromises)).then(function(results) {

            var carouselLinks = [],
            linksContainer = element.find('#links'),
            carouselLinksPromises = [];
            // Add the demo images as links with thumbnails to the page:
            $.each(results, function (index, result) {
                carouselLinksPromises.push(function() {
                    return $.Deferred(function(dfd) {

                      $('<a/>')
                          .append($('<img>').prop('src', result.file))
                          .prop('href', result.file)
                          .prop('title', result.name)
                          .attr('data-gallery', '')
                          .appendTo(linksContainer);
                      var carouselLink = {
                          href: result.file,
                          title: result.name
                      };
                      carouselLinks.push(carouselLink);

                      dfd.resolve(carouselLink);
                    }).promise();
                });

            });

            // 使用blueimp创建自动滚动的图片gallery
            $.when(all(carouselLinksPromises)).then(function() {
              $('.scroll-opt').removeClass('hide');
              // Initialize the Gallery as image carousel:
                scope.gallery = blueimp.Gallery(carouselLinks, {
                  container: '#blueimp-gallery-carousel',
                  carousel: true,
                  slideshowInterval: 1,
                  transitionSpeed: 1,
                  startSlideshow: false,
                  hidePageScrollbars: false
              });

            });
            scope.startScroll = function() {
              scope.gallery.play();
            }
            scope.pauseScroll = function() {
              scope.gallery.pause();
            }
          });
        });
      }
    };
  });
