(function() {
  "use strict";

  angular
    .module('Font')
    .factory('userDataService', userDataService);

  userDataService.$inject = ['$http'];

  function userDataService($http) {

    // create a new object
    var userFactory = {};

    userFactory.user = {};

    // get a single user
    userFactory.get = function(id) {
      return $http.get('/api/users/' + id);
    };

     // get all users
    userFactory.all = function() {
      return $http.get('/api/users/');
    };

     // create a user
    userFactory.create = function(userData) {
      return $http.post('/api/users/', userData);
    };

     // update a user
    userFactory.update = function(userData) {
      return $http.put('/api/users/', userData);
    };

     // delete a user
    userFactory.delete = function() {
      return $http.delete('/api/users/');
    };

     // return our entire userFactory object
    return userFactory;
  }

})();
