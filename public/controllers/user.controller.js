(function() {
  "use strict";

  angular.module('Font')
         .controller('UserController', UserController);

  UserController.$inject = ['$state', 'authService', 'userDataService', '$log', '$scope'];

  function UserController($state, authService, userDataService, $log, $scope) {

    $scope.currentUser  = authService.currentUser;
    $scope.createUser   = createUser;
    $scope.deleteUser   = deleteUser;
    $scope.updateUser   = updateUser;
    $scope.pairs        = userDataService.pairs;
    console.log("user controller", $scope.pairs)

    function createUser() {
      $scope.message = '';
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
      userDataService.update($scope.userData)
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
