(function() {
  angular.module('Font')
         .controller('UserController', UserController);

  UserController.$inject = ['$state', 'authService', 'userDataService', '$log', '$scope'];

  function UserController($state, authService, userDataService, $log, $scope) {

    $scope.currentUser = authService.currentUser;
    // attaching functions to controller
    $scope.createUser = createUser;


    // defining function declarations
    function createUser() {
      $scope.message = '';
      // use the create function in the userService
      userDataService.create(vm.userData)
        .success(function(data) {
          $scope.userData = {};
          $scope.message = data.message;
          console.log(vm.message);
        });

        $state.go('fontgen');
    };
  };
})();
