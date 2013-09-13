window.app = angular.module('rm', 
    ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'rm.system', 'rm.articles']);

angular.module('rm.system', []);
angular.module('rm.articles', []);