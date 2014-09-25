'use strict';

describe('Directive: changeBackgoundImage', function () {

  // load the directive's module
  beforeEach(module('luckyManApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<change-backgound-image></change-backgound-image>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the changeBackgoundImage directive');
  }));
});
