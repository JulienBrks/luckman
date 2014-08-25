'use strict';

describe('Directive: imgScroll', function () {

  // load the directive's module
  beforeEach(module('luckyManApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<img-scroll></img-scroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the imgScroll directive');
  }));
});
