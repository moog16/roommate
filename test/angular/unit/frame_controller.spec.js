describe('Unit: FrameController', function() {
  var ctrl, scope;

  beforeEach(angular.mock.module('myApp'));
  beforeEach(angular.mock.module('myApp.controllers'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('FrameController', {$scope: scope});
  }));

  // Write unit tests here
});