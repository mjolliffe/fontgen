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
    userFactory.pairs = [];

    // get a single user
    userFactory.get = function(id) {
      return $http.get(HEROKU_URL + 'api/users/' + id)
    };

     // get all users
    userFactory.all = function() {
      return $http.get(HEROKU_URL + 'api/users/');
    };

     // create a user
    userFactory.create = function(userData) {
      return $http.post(HEROKU_URL + 'api/users/', userData);
    };

     // update a user
    userFactory.update = function(userData) {
      return $http.put(HEROKU_URL + 'api/users/', userData).then(function (data) {
        userFactory.pairs.push(data.config.data);
        console.log("DATA", data)
        console.log("FONTS", userFactory.pairs)
      })
    };

     // delete a user
    userFactory.delete = function() {
      return $http.delete(HEROKU_URL + 'api/users/');
    };

     // return our entire userFactory object
    return userFactory;
  }

})();
