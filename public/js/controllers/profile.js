angular.module('rm.users', [])
.controller('ProfileController', ['$scope','$http', 'profileInit', 'userPref',
  function($scope, $http, profileInit, userPref) {

  var maps = function() {
    var input = (document.getElementById('searchTextField'));
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      if (place.geometry) {
        $scope.place = place;
        $scope.setPrefs();
      }
    });
  };

  var initialize = function() {
    maps();
    var promise = profileInit.init();
    promise.then(function(userProfile) {
      console.log(userProfile);
        $scope.questions = userProfile.questions;
        $scope.userInfo = userProfile.userInfo;

        $scope.durationMin = userProfile.preferences.durationStay[0] || 'n/a';
        $scope.durationMax = userProfile.preferences.durationStay[1] || 'n/a';
        $scope.budgetMin = userProfile.preferences.budget[0] || 'n/a';
        $scope.budgetMax = userProfile.preferences.budget[1] || 'n/a';
        $scope.place = userProfile.preferences.location;
        $scope.setBedroom(userProfile.preferences.dwellingType.bedroom);
        $scope.setHousing(userProfile.preferences.dwellingType.type);
        $scope.setBath(userProfile.preferences.dwellingType.bath);
      }, function(reason) {
        console.log('Failed ', reason);
      }, function(update) {
        console.log('Got notification ', update);
    });

    $scope.housingTypes = ['House', 'Apartment', 'Dorm', 'Co-op', 'Condo', 'Assisted Living'];
    $scope.bedroomRange = _.range(1,7);
    $scope.bedroomRange[6] = '7+';
    $scope.bathRange = $scope.bedroomRange.slice();
    $scope.bathRange.unshift('shared');

    $scope.importance = ['Irrelevant', 'a bit important', 'a little important', 'a lot important', 'a must have'];

    $('#navTabs a').click(function(e) {
      e.preventDefault(0);
      $(this).tab('show');
    });
    $('#navTabs a:first').tab('show');
  };

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

  /***************************************  preferences  *****************************************/

  $scope.setPrefs = function() {
    console.log($scope.place);
    var budget = $('#budgetSlider').data('slider').getValue();
    var duration = $('#durationSlider').data('slider').getValue();
    var housing = {
      type: $scope.housingType,
      bedroom: $scope.bedroomValue,
      bath: $scope.bathValue
    };

    $scope.durationMin = duration[0];
    $scope.durationMax = duration[1];
    $scope.budgetMin = budget[0];
    $scope.budgetMax = budget[1];


    var preferences = {
      location: $scope.place,
      budget: budget,
      dwellingType: housing,
      durationStay: duration
    };
    userPref(preferences);
  };

  $scope.setHousing = function(type) {
    $scope.housingType = type;
  };

  $scope.setBedroom = function(room) {
    $scope.bedroomValue = room;
  };

  $scope.setBath = function(room) {
    $scope.bathValue = room;
  };

  initialize();
}]);