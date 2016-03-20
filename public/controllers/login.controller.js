(function() {
  "use strict";

  angular
    .module("Font")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "userDataService", "$log", "authService", "$scope"];

  function LoginController($state, userDataService, $log, authService, $scope) {
    $scope.login        = login;
    $scope.isLoggedIn   = authService.isLoggedIn;
    // $scope.currentUser  = userDataService.user;
    $scope.pairs        = userDataService.pairs;
    // Form data for login
    $scope.loginData;

    function login() {
      authService.login($scope.loginData.email, $scope.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          userDataService.user  = res.data.user;
          console.log(res.data)
          $state.go('profile');
        });
    };

  }

})();
