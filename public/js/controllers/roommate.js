angular.module('rm.roommates.controller', [])
.controller('RoommatesController', ['$scope', '$http', 'roommateInit', function ($scope, $http, roommateInit) {

  // $scope.roommateInfo
  var promise = roommateInit.init();
  promise.then(function(roommateInfo) {
    console.log(roommateInfo);
    $scope.roommateInfo = roommateInfo;
    $scope.roommateInfo.roommates[0].isActive = true;
  }, function(reason) {
    console.log('Failed ', reason);
  }, function(update) {
    console.log('Got notification ', update);
  })


  $scope.showNextRoommate = function() {
    $scope.roommateInfo.roommates.splice(0,1);
    $scope.roommateInfo.mutualRoommateInfo.splice(0,1);
    if($scope.roommateInfo.roommates.length >= 1) {
      $scope.roommateInfo.roommates[0].isActive = true;
    }
  };


  var importanceWeight = [0, 1, 10, 50, 250];  // 0=irrelevant -> 4=mandatory

  var findCompatibility = function(mutualQuestionIds, roommateNum) {
    var roommateAnswers = $scope.roommates[roommateNum].questions;
    var considerRoommateAnswers = [];
    var userSum = 0;
    var roommateSum = 0;
    var userDivisor = 0;
    var roommateDivisor = 0;
    var S = 0;

    for(var i=0; i<roommateAnswers.length; i++) {
      if(_.indexOf(mutualQuestionIds, roommateAnswers[i].questionId) > -1) {
        var roommateQAset = roommateAnswers[i];
        var userQAset = $scope.user.questions[$scope.userQAIndex[roommateAnswers[i].questionId]];
        //set user numbers based off of roommate answers
        if(_.indexOf(userQAset.accepts, roommateQAset.answer) > -1) {
          userSum += importanceWeight[userQAset.importance];
        }
        //set roommate numbers based off of user answers
        userDivisor += importanceWeight[userQAset.importance];
        if(_.indexOf(roommateQAset.accepts, userQAset.answer) > -1) {
          //if user's answer is acceptable to roommate, then add
          //the importance weight to the roommateSum
          roommateSum += importanceWeight[roommateQAset.importance];
        }
        //divisor is what we divide by to get a percentage
        roommateDivisor += importanceWeight[roommateQAset.importance];
        S++;
      }
    }

    // console.log('userSum', userSum);
    // console.log('roommateSum', roommateSum);
    // console.log('userDivisor', userDivisor);
    // console.log('roommateDivisor', roommateDivisor);

    //multiply the two and sqrt to get the true match, with error
    var truMatchE = Math.sqrt(userSum/userDivisor * roommateSum/roommateDivisor);

    //error = 1/S, where S = #mutualQuestionsAnswered by both parties
    var error = 1/S;

    //take lowest possible match score by subtracting error
    return truMatchE-error;
    // console.log('true match is ', truMatchE, '+/-',  error);
  };

}]);