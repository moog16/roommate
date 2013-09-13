angular.module('rm.users', [])
.controller('ProfileController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
  $scope.global = Global;

  $scope.temporary = 'hello';

  $http({
    method: 'GET',
    url: '/api/userInfo'})
  .success(function(data, status, headers, config) {
    console.log('data', data);
    $scope.userInfo = JSON.parse(data);
  })
  .error(function(err, status, headers, config) {
    if(err) throw err;
  });
}]);