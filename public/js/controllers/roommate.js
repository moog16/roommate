angular.module('rm.roommates', [])
.controller('RoommatesController', ['$scope', '$http', function ($scope, $http) {

  $http({
    method: 'GET',
    url: '/api/getRoommate'})
  .success(function(data, status, headers, config) {
    console.log(data);
    $scope.roommates = data;
    $scope.roommates[0].isActive = true;
    $scope.roommates[$scope.roommates.length] = {
      facebook: {
        name: 'reached end of list'
      }
    };
  })
  .error(function(err, status, headers, config) {
    if(err) throw err;
  });

  $scope.showNextRoommate = function() {
    // console.log('hello');
    $scope.roommates[1].isActive = true;
    $scope.roommates.splice(0,1);
  };
}]);