angular.module('rm.getMutual.service', [])
.factory("getMutual", ['compatibility', 'intersection',
  function(compatibility, intersection) {

  var mutualRoommateInfo = [];

  var info = function(roommates, userQuestions, userQAIndex, userFacebook) {
    for(var i=0; i<roommates.length; i++) {
      mutualInfoCalc(roommates[i], userQuestions, userQAIndex, userFacebook);
    }
    return mutualRoommateInfo;
  };

  var mutualInfoCalc = function(roommate, userQuestions, userQAIndex, userFacebook) {
    var newMutualInfo = {};
    newMutualInfo.music = findIntersect(roommate, 'music', userFacebook);
    newMutualInfo.movies = findIntersect(roommate, 'movies', userFacebook);
    newMutualInfo.friends = findIntersect(roommate, 'friends', userFacebook);
    newMutualInfo.questionIds = intersection.question(roommate.questions, userQuestions);
    newMutualInfo.compatibility = compatibility(newMutualInfo.questionIds,
                                                roommate.questions,
                                                userQuestions,
                                                userQAIndex);
    mutualRoommateInfo.push(newMutualInfo);
  };

  var findIntersect = function(roommate, infoCategory, userFacebook) {
    return intersection.objects(userFacebook[infoCategory].data, roommate.facebook[infoCategory].data);
  };
  
  return {
    info: info
  };
}]);