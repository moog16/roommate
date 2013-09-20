angular.module('rm.roommates', [])
.controller('RoommatesController', ['$scope', '$http', function ($scope, $http) {

  $http.get('/api/getRoommate')
  .success(function(roommateData, status, headers, config) {
    // console.log('roommates ', data);
    $scope.roommates = roommateData;
    $scope.roommates[0].isActive = true;
    $http.get('/api/userInfo')
    .success(function(userData, status, headers, config) {
      // console.log('user ', data);
      $scope.user = userData;
      $scope.mutualRoommateInfo = [];
      getMutualInfo();
    })
    .error(function(err) {
      if(err) throw err;
    });
  })
  .error(function(err, status, headers, config) {
    if(err) throw err;
  });

  $scope.showNextRoommate = function() {
    $scope.roommates.splice(0,1);
    $scope.mutualRoommateInfo.splice(0,1);
    if($scope.roommates.length >= 1) {
      $scope.roommates[0].isActive = true;
    }
  };

  var getMutualInfo = function() {
    for(var i=0; i<$scope.roommates.length; i++) {
      mutualInfoCalc(i);
    }
    // console.log($scope.mutualRoommateInfo);
  };

  var mutualInfoCalc = function(roommateNum) {
    var newMutualInfo = {};
    newMutualInfo.mutualMusic = findIntersect($scope.roommates[roommateNum], 'music');
    newMutualInfo.mutualMovies = findIntersect($scope.roommates[roommateNum], 'movies');
    newMutualInfo.mutualFriends = findIntersect($scope.roommates[roommateNum], 'friends');
    $scope.mutualRoommateInfo.push(newMutualInfo);
  };

  var findIntersect = function(roommate, infoCategory) {
    return _.intersectionObjects($scope.user[infoCategory].data, roommate.facebook[infoCategory].data);
  };

  _.intersectionObjects = function(array) {
    var slice = Array.prototype.slice; // added this line as a utility
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        //return _.indexOf(other, item) >= 0;
        return _.any(other, function(element) { return _.isEqual(element, item); });
      });
    });
  };

}]);