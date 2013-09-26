angular.module('rm.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;

  $scope.menu = [{
    "title": "My Profile",
    "link": "userProfile"
  }, {
    "title": "Roommates!",
    "link": "roommates"
  }, {
  //   "title": "Questions",
  //   "link": "questions"
  // }, {
  //   "title": "Create New Questions",
  //   "link": "questions/create"
  // }, {
    "title": "Checkout Your Faves",
    "link": "favorites"
  }];
}]);