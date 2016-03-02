(function() {
  "use strict";

  angular
      .module("Font")
      .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "$scope"];

  function MainController($state, userDataService, $log, authService, $scope) {


    $scope.currentUser    = authService.currentUser;
    $scope.logout         = authService.logout;
    $scope.isLoggedIn     = authService.isLoggedIn;
    $scope.pairs          = userDataService.pairs;

    $scope.$state = $state;

  }

})();

