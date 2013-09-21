angular.module('rm.roommates.controller', [])
.controller('RoommatesController', ['$scope', '$modal', 'roommateInit',
  function ($scope, $modal, roommateInit) {

  if(Object.keys(roommateInit.vars).length === 0) {
    var promise = roommateInit.init();
    promise.then(function(roommateInfo) {
      // console.log(roomateInfo);
      $scope.roommateInfo = roommateInfo;
      $scope.roommateInfo.roommates[0].isActive = true;
    }, function(reason) {
      console.log('Failed ', reason);
    }, function(update) {
      console.log('Got notification ', update);
    });
  } else {
    $scope.roommateInfo = roommateInit.vars;
  }

  var showNextRoommate = function() {
    $scope.roommateInfo.roommates.splice(0,1);
    $scope.roommateInfo.mutualRoommateInfo.splice(0,1);
    if($scope.roommateInfo.roommates.length >= 1) {
      $scope.roommateInfo.roommates[0].isActive = true;
    }
  };

  $scope.likeButton = function() {
    //modal messaging
    var modalBox = $modal.open({
      templateUrl: '../public/views/messageModal.html',
      controller: RoommatesController,
      resolve: {
      }
    })
    //input into favorites && skipBox
    //showNextRoommate()
  };

  $scope.nopeButton = function() {
    //input into skipBox
    //showNextRoommate()
  };
}]);