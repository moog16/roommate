angular.module('rm.mutualQuestions.controller', [])
.controller('MutualQuestionsController', ['$scope', '$location', 'roommateInit',
  function ($scope, $location, roommateInit) {

  if(Object.keys(roommateInit.vars).length === 0) {
    var promise = roommateInit.init();
    promise.then(function(roommateInfo) {
      console.log(roommateInfo);
      $scope.vars = roommateInfo;
    }, function(reason) {
      console.log('Failed ', reason);
    }, function(update) {
      console.log('Got notification ', update);
    });
  } else {
    $scope.vars = roommateInit.vars;
  }

  // console.log('MutualQuestionsController ', $scope.vars);

  var roommateFacebookId = Object.keys($location.search())[0];

}]);