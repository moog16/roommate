angular.module('rm.roommate.directive', [])
.directive('roommateView', function() {
  return {
    // showNextRoommate: function(scope, element, attr) {
    //   event.preventDefault();
    //   console.log('hello');
    //   // $scope.roommates[1].isActive = true;
    //   // delete $scope.roommates[0];
    // },

    link: function(scope, elem, attr, ctrl) {

    }
  }
})
.directive('compatibility', function() {
  return {
    Restrict: 'E',
    template: '<span>hello this is a test</span>'
  }
});