(function() {

  angular.module('Font')

      .factory('authToken', authToken)
      .factory('authService', authService)
      .factory('authInterceptor', authInterceptor)

  authToken.$inject = ['$window'];
  authService.$inject = ['$http', '$q', 'authToken', 'userDataService', '$state'];
  authInterceptor.$inject = ['$q', '$location', 'authToken'];


  function authService($http, $q, userDataService, $state){
    // create auth factory object
    var authFactory = {};
    var currentUser;
    // handle login
    authFactory.login = function(username, password) {
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
        .success(function(data){
          authToken.setToken(data.token);
          currentUser = data.user;
          userDataService.user = data.user;
          return data;
        });
    }

    // handle logout
    authFactory.logout = function(){
      authToken.setToken();
      $state.go('fontgen.html')
    }

    // check if a user is logged in
    authFactory.isLoggedIn = function(){
      if(authToken.getToken())
        return true;
      else
        return false;
    }

    authFactory.currentUser = function(){
      return currentUser;
    }

    // get the user info
    authFactory.getUser = function(id){
      if(authToken.getToken())
        return $http.get('/api/users/' + id, {cache: true});
      else
        return $q.reject({message: 'User has no token.'})
    }
    // return auth factory object
    return authFactory;
  }



   // =================================================
   // factory for handling tokens
   // inject $window to store token client-side
   // =================================================
   function authToken($window) {

    var authTokenFactory = {};

    authTokenFactory = function(){
      return $window.localStorage.getItem('token');
    }

    authTokenFactory.setToken = function(token){
      if(token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    }

    return authTokenFactory;

   }

   // =================================================
   // application configuration to integrate token to requests
   // =================================================
   function authInterceptor($q, $location, authToken) {

    var interceptorFactory = {};

    // attach the token to every request
    interceptorFactory.request = function(config){
      var token = authToken.getToken();
      if(token)
        config.header['x-access-token'] = token;
      return config;
    }
    // redirect if a token doesn't authenticate

    interceptorFactory.responseError = function(response){
      if (response.status==403){
        authToken.setToken();
        $location.path('/')
      }
      return $q.reject(response);
    }

    return interceptorFactory;
   }

})();
