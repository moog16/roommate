angular.module('rm.users', [])
.controller('ProfileController', ['$scope', '$http', function ($scope, $http) {
  // $scope.global = Global

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


  $http({
    method: 'GET',
    url: '/api/getQuestions'})
  .success(function(data, status, headers, config) {
    $scope.questions = data;
  })
  .error(function(err, status, headers, config) {
    if(err) throw err;
  });

  
}]);