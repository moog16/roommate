angular.module('rm.roommates.controller', [])
.controller('RoommatesController', ['$scope', 'roommateInit', 'sendRoommate',
  function ($scope, roommateInit, sendRoommate) {


  var showNextRoommate = function() {
    $scope.roommateInfo.roommates.splice(0,1);
    $scope.roommateInfo.mutualRoommateInfo.splice(0,1);
    setNoMutualInfo();
    if($scope.roommateInfo.roommates.length >= 1) {
      $scope.roommateInfo.roommates[0].isActive = true;
    }
  };

  var setNoMutualInfo = function() {
    if($scope.roommateInfo.mutualRoommateInfo[0].movies.length === 0 ) {
      $scope.moviePic = '../img/nothing.jpg';
      $scope.movieName = 'none';
    } else {
      $scope.moviePic = $scope.roommateInfo.mutualRoommateInfo[0].movies[0].picture.data.url;
      $scope.movieName = $scope.roommateInfo.mutualRoommateInfo[0].movies[0].name;
    }
    if($scope.roommateInfo.mutualRoommateInfo[0].music.length === 0) {
      $scope.musicPic = '../img/nothing.jpg';
      $scope.musicName = 'none';
    } else {
      $scope.musicPic = $scope.roommateInfo.mutualRoommateInfo[0].music[0].picture.data.url;
      $scope.musicName = $scope.roommateInfo.mutualRoommateInfo[0].music[0].name;
    }
    if($scope.roommateInfo.mutualRoommateInfo[0].friends.length === 0) {
      $scope.friendsPic = '../img/nothing.jpg';
      $scope.friendsName = 'none';
    } else {
      $scope.friendsPic = $scope.roommateInfo.mutualRoommateInfo[0].friends[0].picture.data.url;
      $scope.friendsName = $scope.roommateInfo.mutualRoommateInfo[0].friends[0].name;
    }
  };

  $scope.mutualMoviesModal = function() {
    $('#mutualMoviesModal').modal('toggle');
  };

  $scope.mutualMusicModal = function() {
    $('#mutualMusicModal').modal('toggle');
  };

  $scope.mutualFriendsModal = function() {
    $('#mutualFriendsModal').modal('toggle');
  };

  $scope.likeButton = function(roommate) {
    // sendRoommate.favorite(roommate);
    showNextRoommate();
  };

  $scope.nopeButton = function(roommate) {
    // sendRoommate.skip(roommate);  uncomment to stop seening same person
    showNextRoommate();
  };
  
  if(Object.keys(roommateInit.vars).length === 0) {
    var promise = roommateInit.init();
    promise.then(function(roommateInfo) {
      // console.log(roommateInfo);
      console.log(roommateInfo.roommates[0].facebook.name);
      $scope.roommateInfo = roommateInfo;
      setNoMutualInfo();
    }, function(reason) {
      console.log('Failed ', reason);
    }, function(update) {
      console.log('Got notification ', update);
    });
  } else {
    $scope.roommateInfo = roommateInit.vars;
    setNoMutualInfo();
  }

}]);