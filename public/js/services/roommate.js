angular.module('rm.roommate.service', [])
.factory("roommateInit", ['$http', '$q', 'getMutual',
  function($http, $q, getMutual) {


  var roommateInitVars = {};

  var init = function() {
    var deferred = $q.defer();

    // deferred.notify('loading up all roommates');
    $http.get('/api/getRoommate')
    .success(function(roommateData, status, headers, config) {
      $http.get('/api/userInfo')
      .success(function(userData, status, headers, config) {
        roommateInitVars.roommates = roommateData;
        roommateInitVars.user = userData;
        roommateInitVars.userQAIndex = {};
        for(var i=0; i<userData.questions.length; i++) {
          roommateInitVars.userQAIndex[userData.questions[i].questionId] = i;
        }
        roommateInitVars.mutualRoommateInfo = getMutual.info(roommateInitVars.roommates,
                                                             roommateInitVars.user.questions,
                                                             roommateInitVars.userQAIndex,
                                                             roommateInitVars.user.facebook);
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

  return {
    init: init,
    vars: roommateInitVars
  };
}]);