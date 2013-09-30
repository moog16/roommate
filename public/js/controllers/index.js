angular.module('rm.system')
.controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;

  $('.carousel').carousel({
    wrap: true
  });

  $scope.check = function() {
    console.log('test');
    console.log($('.active img'));
    if($('.active img').hasClass('.first')) {
      $scope.noPrevious = false;
    } else {
      $scope.noPrevious = true;
    }
  };

}]);