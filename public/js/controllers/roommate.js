angular.module('rm.roommates.controller', [])
.controller('RoommatesController', ['$scope', 'roommateInit',
  function ($scope, roommateInit) {

  var promise = roommateInit.init();
  promise.then(function(roommateInfo) {
    // console.log(roommateInfo);
    $scope.roommateInfo = roommateInfo;
    $scope.roommateInfo.roommates[0].isActive = true;
  }, function(reason) {
    console.log('Failed ', reason);
  }, function(update) {
    console.log('Got notification ', update);
  });


  $scope.showNextRoommate = function() {
    $scope.roommateInfo.roommates.splice(0,1);
    $scope.roommateInfo.mutualRoommateInfo.splice(0,1);
    if($scope.roommateInfo.roommates.length >= 1) {
      $scope.roommateInfo.roommates[0].isActive = true;
    }
  };

}]);