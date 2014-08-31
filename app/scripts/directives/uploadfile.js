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
      template: '<p class="text-center">\
                    <a class="btn btn-lg btn-success", href="javascript:void(0);", ng-click="startScroll()">开始\
                      <span class="glyphicon glyphicon-play"></span>\
                    </a>\
                    <a class="btn btn-lg btn-success", href="javascript:void(0);", ng-click="pauseScroll()">暂停\
                      <span class="glyphicon glyphicon-pause"></span>\
                    </a>\
                 </p>\
                 <input id="file" type="file" multiple>\
                 <div id="links" class="hide"></div>\
                 <!-- The Gallery as inline carousel, can be positioned anywhere on the page -->\
                 <div id="blueimp-gallery-carousel" class="blueimp-gallery blueimp-gallery-carousel">\
                     <div class="slides"></div>\
                     <h3 class="title"></h3>\
                     <a class="prev">‹</a>\
                     <a class="next">›</a>\
                     <a class="play-pause"></a>\
                     <ol class="indicator"></ol>\
                 </div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        element.find('#file').change(function(){
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
            linksContainer = element.find('#links');
            // Add the demo images as links with thumbnails to the page:
            $.each(results, function (index, result) {
                $('<a/>')
                    .append($('<img>').prop('src', result))
                    .prop('href', result)
                    .prop('title', result.name)
                    .attr('data-gallery', '')
                    .appendTo(linksContainer);
                carouselLinks.push({
                    href: result,
                    title: result.name
                });
            });
            // Initialize the Gallery as image carousel:
            var gallery = blueimp.Gallery(carouselLinks, {
                container: '#blueimp-gallery-carousel',
                carousel: true,
                slideshowInterval: 1,
                transitionSpeed: 1,
                startSlideshow: false
            });
            scope.startScroll = function() {
              gallery.play();
            }
            scope.pauseScroll = function() {
              gallery.pause();
              console.log(gallery.getIndex());
            }
          });
        });
      }
    };
  });
