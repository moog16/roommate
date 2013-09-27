angular.module('rm.sendRoommate.service', [])
.factory("sendRoommate", ['$http',
  function($http) {

  var skip = function(roommate) {
    $http.post('/api/setUserRoommates', {roommate: roommate, type: 'roommatesSeen'})
    .success(function(response, status, headers, config) {
      console.log(response);
    }).error(function(err) { if(err) throw err; });
  };

  var favorite = function(roommate) {
    $http.post('/api/setUserRoommates', {roommate: roommate, type: 'roommatesFavorite'})
    .success(function(response, status, headers, config) {
      console.log(response);
    }).error(function(err) { if(err) throw err; });

  };

  return {
    skip: skip,
    favorite: favorite
  };
}]);