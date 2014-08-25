/**
 * ## 使用angularjs控制图片滚动
 * * 它能够提供开始和结束的事件
 * * 它能够提供当前被选中的图片在所有图片中的索引值
 * * 能够支持一两百张照片的滚动
 * * 能够支持设置滚动速度
 * * 能够支持传入照片的功能
 */
// 'use strict';

/**
 * @ngdoc directive
 * @name luckyManApp.directive:imgScroll
 * @description
 * # imgScroll
 */
angular.module('luckyManApp')
  .directive('imgScroll', function () {
    return {
      // template: '<div class="drop-file">请把图片或者文件夹拖动到这里</div>\
      //            <div class="list"></div>',
      // template: '<input type="file" id="files" name="files[]" multiple  />\
      //            <div class="list"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // 对应上面第一个template, 主要用作拖动文件的功能
        //
        // function handleDragOver(evt) {
        //   evt.stopPropagation();
        //   evt.preventDefault();
        //   evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        // }
        //
        // function handleFileSelect(evt) {
        //   evt.stopPropagation();
        //   evt.preventDefault();
        //
        //   scope.files = evt.dataTransfer.files; // FileList object.
        //   window.console.log(scope.files);
        //   // files is a FileList of File objects. List some properties.
        //   var output = [];
        //   for (var i = 0, f; f = scope.files[i]; i++) {
        //     output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
        //                 f.size, ' bytes, last modified: ',
        //                 f.lastModifiedDate.toLocaleDateString(), '</li>');
        //   }
        //   element.find('.list').html('<ul>' + output.join('') + '</ul>');
        // }
        //
        // element[0].addEventListener('dragover', handleDragOver, false);
        // element[0].addEventListener('drop', handleFileSelect, false);

        // 用于第二个template.用于文件上传框的操作
        // element.find('#files')[0].addEventListener('change', handleFileSelect, false);
      }
    };
  });
