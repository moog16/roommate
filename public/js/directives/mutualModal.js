angular.module('rm.mutualModal.directive', [])
.directive('mutualMovies', function() {
  return {
    Restrict: 'A',
    templateUrl: '../views/mutualModals/movies.html'
  };
})
.directive('mutualMusic', function() {
  return {
    Restrict: 'A',
    templateUrl: '../views/mutualModals/music.html'
  };
})
.directive('mutualFriends', function() {
  return {
    Restrict: 'A',
    templateUrl: '../views/mutualModals/friends.html'
  };
})
.directive('mutualLikes', function() {
  return {
    Restrict: 'A',
    templateUrl: '../views/mutualModals/likes.html'
  };
});