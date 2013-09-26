angular.module('rm.userProfile.directive', [])
.directive('userMoviesModal', function() {
  return {
    templateUrl: '../views/userProfileModal/userMovie.html'
  };
})
.directive('userMusicModal', function() {
  return {
    templateUrl: '../views/userProfileModal/userMusic.html'
  };
})
.directive('userQuestions', function() {
  return {
    templateUrl: '../views/userQuestions.html'
  };
})
.directive('userLikeModal', function() {
  return {
    templateUrl: '../views/userProfileModal/userLikes.html'
  };
});