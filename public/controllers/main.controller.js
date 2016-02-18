(function() {
  "use strict";

  angular
      .module("Font")
      .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService"];

  function MainController($state, userDataService, $log, authService) {

    $scope.currentUser = authService.currentUser;
    $scope.logout = authService.logout;
    $scope.isLoggedIn = authService.isLoggedIn;

    $scope.$state = $state;

  }

})();

