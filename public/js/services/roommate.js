angular.module('rm.roommate.service', [])
.factory("roommateInit", ['$http', '$q', 'compatibility', function($http, $q, compatibility) {

  var roommateInitVars = {};

  var initRoommate = function() {
    var deferred = $q.defer();

    //deferred.notify('loading up all roommates');
    $http.get('/api/getRoommate')
    .success(function(roommateData, status, headers, config) {
      $http.get('/api/userInfo')
      .success(function(userData, status, headers, config) {
        // console.log('roommates ', roommateData);
        // console.log('user ', userData);
        roommateInitVars.roommates = roommateData;
        roommateInitVars.user = userData;
        roommateInitVars.userQAIndex = {};
        // $scope.roommates = roommateData;
        // $scope.user = userData;
        // $scope.userQAIndex = {};
        for(var i=0; i<userData.questions.length; i++) {
          roommateInitVars.userQAIndex[userData.questions[i].questionId] = i;
          // $scope.userQAIndex[userData.questions[i].questionId] = i;
        }
        roommateInitVars.mutualRoommateInfo = [];
        // $scope.mutualRoommateInfo = [];
        getMutualInfo();
        console.log(roommateInitVars);
        deferred.resolve(roommateInitVars);
      })
      .error(function(err) {
        if(err) throw err;
      });
    })
    .error(function(err, status, headers, config) {
      if(err) throw err;
    });

    return deferred.promise;
  };

  var getMutualInfo = function() {
    // for(var i=0; i<$scope.roommates.length; i++) {
    for(var i=0; i<roommateInitVars.roommates.length; i++) {
      mutualInfoCalc(i);
    }
  };

  var mutualInfoCalc = function(roommateNum) {
    var newMutualInfo = {};
    // newMutualInfo.music = findIntersect($scope.roommates[roommateNum], 'music'); //needchanging
    // newMutualInfo.movies = findIntersect($scope.roommates[roommateNum], 'movies');
    // newMutualInfo.friends = findIntersect($scope.roommates[roommateNum], 'friends');
    // newMutualInfo.questionIds = findIntersectQuestion($scope.roommates[roommateNum].questions);
    newMutualInfo.questionIds = findIntersectQuestion(roommateInitVars.roommates[roommateNum].questions);
    // newMutualInfo.compatibility = findCompatibility(newMutualInfo.questionIds, roommateNum);

    // $scope.mutualRoommateInfo.push(newMutualInfo);
    roommateInitVars.mutualRoommateInfo.push(newMutualInfo);
  };

  var findIntersect = function(roommate, infoCategory) {
    // return _.intersectionObjects($scope.user.facebook[infoCategory].data, roommate.facebook[infoCategory].data);
    return _.intersectionObjects(roommateInitVars.user.facebook[infoCategory].data, roommate.facebook[infoCategory].data);
  };

  var findIntersectQuestion = function(roommate) {
    var userQuestionIds = [];
    var roommateQuestionIds = [];
    // for(var i=0; i<$scope.user.questions.length; i++) {
      // userQuestionIds.push($scope.user.questions[i].questionId);
    for(var i=0; i<roommateInitVars.user.questions.length; i++) {
      userQuestionIds.push(roommateInitVars.user.questions[i].questionId);
    }
    for(var j=0; j<roommate.length; j++) {
      roommateQuestionIds.push(roommate[j].questionId);
    }
    return _.intersection(userQuestionIds, roommateQuestionIds);
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
  
  return {
    init: initRoommate
  }
}]);