//Setting up route
window.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    // .when('/articles', {
    //   templateUrl: 'views/articles/list.html'
    // })
    // .when('/articles/create', {
    //   templateUrl: 'views/articles/create.html'
    // })
    // .when('/articles/:articleId/edit', {
    //   templateUrl: 'views/articles/edit.html'
    // })
    // .when('/articles/:articleId', {
    //   templateUrl: 'views/articles/view.html'
    // })
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