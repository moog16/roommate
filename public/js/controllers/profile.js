angular.module('rm.users', [])
.controller('ProfileController', ['$scope','$http', 'profileInit', 'userPref',
  function($scope, $http, profileInit, userPref) {

  var maps = function() {
    var input = (document.getElementById('searchTextField'));
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      $scope.place = place;
      if (!place.geometry) {
        input.className = 'notfound';
        return;
      }
    });
  };

  maps();
  $('#budgetSlider').slider();

  var promise = profileInit.init();
  promise.then(function(userProfile) {
      $scope.questions = userProfile.questions;
      $scope.userInfo = userProfile.userInfo;
      $scope.userPref = userProfile.userPref;
    }, function(reason) {
      console.log('Failed ', reason);
    }, function(update) {
      console.log('Got notification ', update);
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
      resetValidation();
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
    if($scope.questions.length >= 1) {
      // $scope.questions[1].isActive = true;
    }
    resetValidation();
    $scope.questions.splice(0,1);
  };

  var resetValidation = function() {
    $scope.userAnswer = null;
    $scope.userAccepts = null;
    $scope.userImportance = null;
    $scope.validForm = false;
  };

  //form validation
  var isValid = function() {
    // debugger;
    if($scope.userAnswer !== null && $scope.userAnswer !== undefined &&
       ($scope.userAccepts && $scope.userAccepts.length > 0) &&
       $scope.userImportance !== null && $scope.userImportance !== undefined) {
      $scope.validForm = true;
    } else {
      $scope.validForm = false;
    }
  };

  $scope.openMovies = function() {
    $('#userMovieModal').modal('toggle');
  };  

  $scope.openMusic = function() {
    $('#userMusicModal').modal('toggle');
  };

  $scope.setPrefs = function() {
    console.log($scope.place);
    // var preferences = {
    //   location: $scope.place, //geolocation data, will determine what search results bring back
    //   budget: $scope.budget, //how much are you willing to spend
    //   dwellingType: $scope.dwelling, //apartment/house/etc
    //   durationStay: $scope.duration //days
    // };
    // userPref(preferences);
  };

}]);