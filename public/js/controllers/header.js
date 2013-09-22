angular.module('rm.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
  $scope.global = Global;

  $scope.menu = [{
  //   "title": "Articles",
  //   "link": "articles"
  // }, {
  //   "title": "Create New Article",
  //   "link": "articles/create"
  // }, {
    "title": "Questions",
    "link": "questions"
  }, {
    "title": "Create New Questions",
    "link": "questions/create"
  }];
}]);