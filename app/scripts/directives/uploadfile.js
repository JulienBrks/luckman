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
        scope.imagesLoaded = false;
        element.find('#files').change(function(){
          var that = this;
          var loadImagePromises = [];
          var all = function(array){
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
          $.each(that.files, function(key, file) {
            loadImagePromises.push(function() {
              return $.Deferred(function(dfd) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function() {
                  this.result.name = file.name;
                  dfd.resolve(this.result);
                }
              }).promise();
            });
          });
          $.when(all(loadImagePromises)).then(function(results) {

            var carouselLinks = [],
            linksContainer = element.find('#links'),
            carouselLinksPromises = [];
            // Add the demo images as links with thumbnails to the page:
            $.each(results, function (index, result) {
                carouselLinksPromises.push(function() {
                    return $.Deferred(function(dfd) {

                      $('<a/>')
                          .append($('<img>').prop('src', result))
                          .prop('href', result)
                          .prop('title', result.name)
                          .attr('data-gallery', '')
                          .appendTo(linksContainer);
                      var carouselLink = {
                          href: result,
                          title: result.name
                      };
                      carouselLinks.push(carouselLink);

                      dfd.resolve(carouselLink);
                    }).promise();
                });

            });

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
              // console.log(gallery.getIndex());
            }
          });
        });
      }
    };
  });
