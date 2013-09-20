angular.module('rm.roommates', [])
.controller('RoommatesController', ['$scope', '$http', function ($scope, $http) {

  $http.get('/api/getRoommate')
  .success(function(roommateData, status, headers, config) {
    // console.log('roommates ', roommateData);
    $scope.roommates = roommateData;
    $scope.roommates[0].isActive = true;
    $http.get('/api/userInfo')
    .success(function(userData, status, headers, config) {
      // console.log('user ', userData);
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
    // newMutualInfo.music = findIntersect($scope.roommates[roommateNum], 'music');
    // newMutualInfo.movies = findIntersect($scope.roommates[roommateNum], 'movies');
    // newMutualInfo.friends = findIntersect($scope.roommates[roommateNum], 'friends');
    newMutualInfo.questionIds = findIntersectQuestion($scope.roommates[roommateNum].questions);
    newMutualInfo.compatibility = findCompatibility(newMutualInfo.questionIds, roommateNum);
    $scope.mutualRoommateInfo.push(newMutualInfo);
  };

  var findIntersect = function(roommate, infoCategory) {
    return _.intersectionObjects($scope.user.facebook[infoCategory].data, roommate.facebook[infoCategory].data);
  };

  var findIntersectQuestion = function(roommate) {
    var userQuestionIds = [];
    var roommateQuestionIds = [];
    for(var i=0; i<$scope.user.questions.length; i++) {
      userQuestionIds.push($scope.user.questions[i].questionId);
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

  var findCompatibility = function(mutualQuestionIds, roommateNum) {
    var roommateAnswers = $scope.roommates[roommateNum].questions;
    var considerRoommateAnswers = [];
    for(var i=0; i<roommateAnswers.length; i++) {
      if(_.indexOf(mutualQuestionIds, roommateAnswers[i].questionId > -1)) {
        console.log(roommateNum, roommateAnswers[i]);
      }
    }

    //get user accepted answers
    //calculate what each one allows for
    //sum up
  };

  var getMutualAnswersFromRoommate = function(questionIds) {
    // $http.post('/api/getQuestions/fromUser', mutualQuestions)
    // .success(function(userQuestions, status, headers, config) {
    //   console.log(userQuestions);
    // }).error(function(err) { if(err) throw err; });
  };

}]);