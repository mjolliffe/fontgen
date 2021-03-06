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
      })
    };

    // get user saved fonts
    userFactory.getFonts = function(userData){
      console.log(HEROKU_URL + 'api/users/fonts')
      return $http.get(HEROKU_URL + 'api/users/fonts', userData).then(function (data){
        console.log("FONTS: ", data.data.user)
        userFactory.pairs = data.data.user
      })
    }

    // userFactory.getFonts();

     // delete a user
    userFactory.delete = function() {
      return $http.delete(HEROKU_URL + 'api/users/');
    };

     // return our entire userFactory object
    return userFactory;
  }

})();
