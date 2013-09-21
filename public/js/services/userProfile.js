angular.module('rm.userProfile.service', [])
.factory("profileInit", ['$http', '$q',
  function($http, $q) {

  var init = function() {
    var userProfile = {};

    var deferred = $q.defer();

    $http.get('/api/userInfo')
    .success(function(userData, status, headers, config) {
      $http.get('/api/getQuestions/unanswered')
      .success(function(questions, status, headers, config) {
        userProfile.userInfo = userData.facebook;
        userProfile.questions = questions;
        deferred.resolve(userProfile);
        
      }).error(function(err, status, headers, config) {if(err) throw err;});
    }).error(function(err, status, headers, config) {if(err) throw err;});

    return deferred.promise;
  };

  return {
    init: init
  };
}]);