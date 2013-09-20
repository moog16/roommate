angular.module('rm.mutualQuestions.controller', [])
.controller('MutualQuestionsController', ['$scope', 'roommateInit', 'mutualQuestions',
  function ($scope, roommateInit, mutualQuestions) {

  var setMutualQuestions = function(rmVars){
    $scope.rmQuestions = _.sortBy(mutualQuestions.rm(rmVars), function(question){
      return question.questionId;
    });
    $scope.userQuestions = _.sortBy(mutualQuestions.user(rmVars), function(question) {
      return question.questionId;
    });
    console.log( $scope.rmQuestions);
    console.log( $scope.userQuestions);
  };

  if(Object.keys(roommateInit.vars).length === 0) {
    var promise = roommateInit.init();
    promise.then(function(roommateInfo) {
      // console.log(roommateInit.vars);
      setMutualQuestions(roommateInit.vars);
    }, function(reason) {
      console.log('Failed ', reason);
    }, function(update) {
      console.log('Got notification ', update);
    });
  } else {
    // console.log(roommateInit.vars);
    setMutualQuestions(roommateInit.vars);
  }

}]);