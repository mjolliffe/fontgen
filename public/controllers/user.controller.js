(function() {
  "use strict";

  angular.module('Font')
         .controller('UserController', UserController);

  UserController.$inject = ['$state', 'authService', 'userDataService', '$log', '$scope'];

  function UserController($state, authService, userDataService, $log, $scope) {

    $scope.currentUser = authService.currentUser;
    // attaching functions to controller
    $scope.createUser = createUser;
    $scope.deleteUser = deleteUser;
    $scope.updateUser = updateUser;

    // defining function declarations
    function createUser() {
      $scope.message = '';
      // use the create function in the userService
      userDataService.create($scope.userData)
        .success(function(data) {
          $scope.userData = {};
          $scope.message = data.message;
          console.log($scope.message);
        });

        $state.go('profile');
    };

    function updateUser() {
      console.log('updating!')
      userDataService.update()
        .success(function(data){
          $scope.userData = {};
          $scope.message = data.message;
          console.log($scope.message);
        });
      $state.go('profile')
    };

    function deleteUser() {
      userDataService.delete()
        .success(function(data){
          $scope.message = data.message;
          console.log($scope.message);
        });
      $state.go('fontgen')
    };
  };
})();
