window.app = angular.module('rm', 
['ngCookies',
'ngResource',
'ui.bootstrap',
'ui.route',
'rm.system',
'rm.articles.service',
'rm.articles.controller',
'rm.users', 
'rm.roommates',
'rm.roommate.directive']);

angular.module('rm.system', []);
angular.module('rm.articles.service', []);
angular.module('rm.articles.controller', []);
angular.module('rm.users', []);
angular.module('rm.roommates', []);
angular.module('rm.roommate.directive', []);