angular.module('rm.favorites.controller', [])
.controller('FavoritesController', ['$scope','$http', function ($scope, $http) {

  $http.get('/api/userInfo')
  .success(function(userData, status, headers, config) {
    $http.post('/api/userArray', userData.roommatesFavorite)
    .success(function(favorites, status, headers, config) {
      $scope.favorites = favorites;
    }).error(function(err) {
      if(err) throw err;
    });
  }).error(function(err) {
    if(err) throw err;
  });
}]);