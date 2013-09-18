angular.module('rm.questions.controller')
.controller('QuestionsController', 
  ['$scope', '$routeParams', '$location', 'Global', 'Questions', 
      function ($scope, $routeParams, $location, Global, Questions) {
  $scope.global = Global;

  $scope.answers = [{a: 'answer 1'}, {a: 'answer 2'}];

  $scope.addAnswer = function() {
    console.log('creating a new question');
    var len = $scope.answers.length+1;
    var placeholder = 'answer ' + len;
    $scope.answers.push({a: placeholder});
  };

  $scope.create = function() {
    console.log('creating a new question');
    var question = new Questions({
      question: this.question,
      answers: this.answers
    });
    question.$save(function(response) {
      $location.path("question/" + response._id);
    });

    this.question = "";
    this.answers = "";
  };

  $scope.remove = function(question) {
    question.$remove();  

    for (var i in $scope.questions) {
      if ($scope.questions[i] == question) {
        $scope.questions.splice(i, 1);
      }
    }
  };

  $scope.update = function() {
    // debugger;
    // console.log('answers ', $scope.question.answers);
    var question = $scope.question;
    // question.answers = $scope.question.answers;
    console.log('answer should be ', $scope.question.answers);
    if (!question.updated) {
      console.log('is this hpa');
      question.updated = [];
    }
    question.updated.push(new Date().getTime());

    console.log($scope.question);
    question.$update(function() {
      $location.path('questions/' + question._id);
    });
  };

  $scope.find = function(query) {
    Questions.query(query, function(questions) {
      $scope.questions = questions;
    });
  };

  $scope.findOne = function() {
    Questions.get({
      questionId: $routeParams.questionId
    }, function(question) {
      if(question.answers[0] === null) {
        question.answers[0] = {a: 'answer 1'};
      }
      $scope.question = question;
    });
  };
}]);