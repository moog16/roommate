//Articles service used for articles REST endpoint
angular.module('rm.questions.service', []).factory("Questions", ['$resource', function($resource) {
    return $resource('questions/:questionId', {
      questionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
}]);