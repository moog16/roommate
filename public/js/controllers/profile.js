angular.module('rm.users', [])
.controller('ProfileController', ['$scope', '$http', function ($scope, $http) {
  // $scope.global = Global

  $http.get('/api/userInfo')
  .success(function(data, status, headers, config) {
    console.log(data);
    $scope.userInfo = data;
  })
  .error(function(err, status, headers, config) {
    if(err) throw err;
  });


  $http({
    method: 'GET',
    url: '/api/getQuestions'})
  .success(function(data, status, headers, config) {
    $scope.questions = data;
    if($scope.questions.length > 0) {
      $scope.questions[0].isActive = true;
    }
  })
  .error(function(err, status, headers, config) {
    if(err) throw err;
  });

  $scope.importance = ['Irrelevant', 'a bit important', 'a little important', 'a lot important', 'a must have'];

  $scope.submitQA = function() {
    var userQuestionAnswers = {
      questionId: this.questionId,
      answer: this.userAnswer,
      accepts: this.userAccepts,
      importance: this.userImportance
    };
    $scope.userAccepts = [];
    $http.post('api/setUserQA', userQuestionAnswers)
    .success(function(data, status, headers, config) {
      $scope.showNextQuestion();
      console.log('set user question and answer ', data);
    }).error(function(err, status, headers, config) { if(err) throw err; });
  };

  $scope.setUserAnswer = function(answer, questionId) {
    $scope.questionId = questionId;
    $scope.userAnswer = answer;
    isValid();
  };

  $scope.setUserAccepts = function(accepts) {
    $scope.userAccepts = $scope.userAccepts || [];
    $scope.userAccepts.push(accepts);
    isValid();
  };

  $scope.setUserImportance = function(importance) {
    $scope.userImportance = importance;
    isValid();
  };

  $scope.showNextQuestion = function() {
    if($scope.questions.length > 1) {
      $scope.questions[1].isActive = true;
    }
    $scope.userAnswer = null;
    $scope.userAccepts = null;
    $scope.userImportance = null;
    $scope.validForm = false;
    $scope.questions.splice(0,1);
  };

  //form validation
  var isValid = function() {
    if($scope.userAnswer !== null &&
       $scope.userAccepts.length > 0 &&
       $scope.userImportance !== null) {
      $scope.validForm = true;
    } else {
      $scope.validForm = false;
    }
  };

}]);