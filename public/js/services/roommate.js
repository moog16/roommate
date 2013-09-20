angular.module('rm.roommate.service', [])
.factory("roommateInit", ['$http', '$q', 'compatibility', 'intersection',
  function($http, $q, compatibility, intersection) {

  var roommateInitVars = {};

  var initRoommate = function() {
    var deferred = $q.defer();

    // deferred.notify('loading up all roommates');
    $http.get('/api/getRoommate')
    .success(function(roommateData, status, headers, config) {
      $http.get('/api/userInfo')
      .success(function(userData, status, headers, config) {
        // console.log('roommates ', roommateData);
        // console.log('user ', userData);
        roommateInitVars.roommates = roommateData;
        roommateInitVars.user = userData;
        roommateInitVars.userQAIndex = {};
        for(var i=0; i<userData.questions.length; i++) {
          roommateInitVars.userQAIndex[userData.questions[i].questionId] = i;
        }
        roommateInitVars.mutualRoommateInfo = [];
        getMutualInfo();
        console.log(roommateInitVars);
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

  var getMutualInfo = function() {
    // for(var i=0; i<$scope.roommates.length; i++) {
    for(var i=0; i<roommateInitVars.roommates.length; i++) {
      mutualInfoCalc(i);
    }
  };

  var mutualInfoCalc = function(roommateNum) {
    var newMutualInfo = {};
    newMutualInfo.music = findIntersect(roommateInitVars.roommates[roommateNum], 'music');
    newMutualInfo.movies = findIntersect(roommateInitVars.roommates[roommateNum], 'movies');
    newMutualInfo.friends = findIntersect(roommateInitVars.roommates[roommateNum], 'friends');
    newMutualInfo.questionIds = intersection.question(roommateInitVars.roommates[roommateNum].questions, roommateInitVars.user.questions);
    // newMutualInfo.compatibility = findCompatibility(newMutualInfo.questionIds, roommateNum);
    roommateInitVars.mutualRoommateInfo.push(newMutualInfo);
  };

  var findIntersect = function(roommate, infoCategory) {
    return intersection.objects(roommateInitVars.user.facebook[infoCategory].data, roommate.facebook[infoCategory].data);
  };
  
  return {
    init: initRoommate
  }
}]);