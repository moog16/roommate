window.app = angular.module('rm', 
['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'rm.system', 'rm.articles', 'rm.users', 'rm.roommates',
'rm.roommate.directive']);

angular.module('rm.system', []);
angular.module('rm.articles', []);
angular.module('rm.users', []);
angular.module('rm.roommates', []);
angular.module('rm.roommate.directive', []);