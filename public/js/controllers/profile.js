angular.module('rm.users', [])
.controller('ProfileController', ['$scope', '$http', function ($scope, $http) {
  // $scope.global = Global;

  $scope.temporary = 'hello';

  $http({
    method: 'GET',
    url: '/api/userInfo'})
  .success(function(data, status, headers, config) {
    console.log(data);
    $scope.userInfo = data;
  })
  .error(function(err, status, headers, config) {
    if(err) throw err;
  });
}]);