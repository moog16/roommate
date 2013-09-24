angular.module('rm.userPref.service', [])
.factory("userPref", ['$http',
  function($http) {

  var sendUserPrefs = function(data) {
    console.log(data);
    $http.post('/api/setUserPref', data)
    .success(function(response, status, headers, config) {
      console.log(response);
    }).error(function(err) { if(err) throw err; });
  };

  return sendUserPrefs;
}]);


