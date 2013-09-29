angular.module('rm.roommates.controller', [])
.controller('RoommatesController', ['$scope', 'roommateInit', 'sendRoommate',
  function ($scope, roommateInit, sendRoommate) {


  var showNextRoommate = function() {
    $scope.roommateInfo.roommates.splice(0,1);
    $scope.roommateInfo.mutualRoommateInfo.splice(0,1);
    setInfo();
    if($scope.roommateInfo.roommates.length >= 1) {
      $scope.roommateInfo.roommates[0].isActive = true;
    }
  };

  var setInfo = function() {
    $scope.moviePic = containsMutualInfo('movies').pic;
    $scope.movieName = containsMutualInfo('movies').name;
    $scope.musicPic = containsMutualInfo('music').pic;
    $scope.musicName = containsMutualInfo('music').name;
    $scope.friendsPic = containsMutualInfo('friends').pic;
    $scope.friendsName = containsMutualInfo('friends').name;
    $scope.likePic = containsMutualInfo('likes').pic;
    $scope.likeName = containsMutualInfo('likes').name;
    $scope.matchPercent = ($scope.roommateInfo.mutualRoommateInfo[0].compatibility * 100).toFixed(2);
    if(isNaN($scope.matchPercent)) {
      $scope.matchPercent = 0;
    }
    $scope.answerQuestions = false;
    if($scope.roommateInfo.user.questions.length > 0) {
      $scope.answerQuestions = true;
    }
    console.log($scope.roommateInfo)
  };

  var containsMutualInfo = function(category) {
    var result = {};
    if( $scope.roommateInfo.mutualRoommateInfo[0][category] === undefined ||
        $scope.roommateInfo.mutualRoommateInfo[0][category] === null ||
        $scope.roommateInfo.mutualRoommateInfo[0][category].length === 0 ) {
      result.pic = '/img/nothing.jpg';
      result.name = 'none';
    } else {
      result.pic = $scope.roommateInfo.mutualRoommateInfo[0][category][0].picture.data.url;
      result.name = $scope.roommateInfo.mutualRoommateInfo[0][category][0].name;
    }
    return result;
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

  $scope.mutualLikesModal = function() {
    $('#mutualLikesModal').modal('toggle');
  };

  $scope.likeButton = function(roommate) {
    // sendRoommate.favorite(roommate);
    showNextRoommate();
  };

  $scope.nopeButton = function(roommate) {
    // sendRoommate.skip(roommate);  uncomment to stop seening same person
    showNextRoommate();
  };

  var init = function() {
    if(Object.keys(roommateInit.vars).length === 0) {
      var promise = roommateInit.init();
      promise.then(function(roommateInfo) {
        $scope.roommateInfo = roommateInfo;
        setInfo();
      }, function(reason) {
        console.log('Failed ', reason);
      }, function(update) {
        console.log('Got notification ', update);
      });
    } else {
      $scope.roommateInfo = roommateInit.vars;
      setInfo();
    }
  };

  init();
}]);