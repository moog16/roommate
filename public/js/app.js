window.app = angular.module('rm', 
['ngCookies',
'ngResource',
'ui.bootstrap',
'ui.route',
'rm.system',
'rm.articles.service',
'rm.articles.controller',
'rm.questions.service',
'rm.questions.controller',
'rm.users', 
'rm.roommates.controller',
'rm.roommate.directive',
'rm.roommate.service',
'rm.compatibility.service',
'rm.roommateHelpers.service',
'rm.mutualQuestions.controller']);

angular.module('rm.system', []);
angular.module('rm.articles.service', []);
angular.module('rm.articles.controller', []);
angular.module('rm.questions.service', []);
angular.module('rm.questions.controller', []);
angular.module('rm.users', []);
angular.module('rm.roommates.controller', []);
angular.module('rm.roommate.directive', []);
angular.module('rm.roommate.service', []);
angular.module('rm.compatibility.service', []);
angular.module('rm.mutualQuestions.controller', []);
angular.module('rm.roommateHelpers.service', []);
