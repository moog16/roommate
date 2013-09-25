//Setting up route
window.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/questions', {
      templateUrl: 'views/questions/list.html'
    })
    .when('/questions/create', {
      templateUrl: 'views/questions/create.html'
    })
    .when('/questions/:questionId/edit', {
      templateUrl: 'views/questions/edit.html'
    })
    .when('/questions/:questionId', {
      templateUrl: 'views/questions/view.html'
    })
    .when('/', {
      templateUrl: 'views/index.html'
    })
    .when('/userProfile', {
      templateUrl: 'views/userProfile.html'
    })
    .when('/roommates', {
      templateUrl: 'views/roommates.html'
    })
    .when('/roommates/mutualQuestions', {
      templateUrl: 'views/mutualQuestions.html'
    })
    .when('/favorites', {
      templateUrl: 'views/favorites.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);