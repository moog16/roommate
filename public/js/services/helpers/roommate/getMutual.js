angular.module('rm.getMutual.service', [])
.factory("getMutual", ['compatibility', 'intersection',
  function(compatibility, intersection) {


  var info = function(roommates, userQuestions, userQAIndex, userFacebook) {
    var mutualRoommateInfo = [];
    for(var i=0; i<roommates.length; i++) {
      mutualRoommateInfo.push(mutualInfoCalc(roommates[i], userQuestions, userQAIndex, userFacebook));
    }
    return mutualRoommateInfo;
  };

  var mutualInfoCalc = function(roommate, userQuestions, userQAIndex, userFacebook) {
    var newMutualInfo = {};
    newMutualInfo.likes = findIntersect(roommate, 'likes', userFacebook);
    newMutualInfo.music = findIntersect(roommate, 'music', userFacebook);
    newMutualInfo.movies = findIntersect(roommate, 'movies', userFacebook);
    newMutualInfo.friends = findIntersect(roommate, 'friends', userFacebook);
    newMutualInfo.questionIds = intersection.question(roommate.questions, userQuestions);
    newMutualInfo.compatibility = compatibility(newMutualInfo.questionIds,
                                                roommate.questions,
                                                userQuestions,
                                                userQAIndex);
    return newMutualInfo;
  };

  var findIntersect = function(roommate, infoCategory, userFacebook) {
    return intersection.objects(userFacebook[infoCategory].data, roommate.facebook[infoCategory].data);
  };
  
  return {
    info: info
  };
}]);