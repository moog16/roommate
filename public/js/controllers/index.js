angular.module('rm.system')
.controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;
}]);