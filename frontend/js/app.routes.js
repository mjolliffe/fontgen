(function(){
"use strict"

angular
  .module('Font')
  .config(AppRoutes);

AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

function AppRoutes($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('font', {
      url:'/',
      templateUrl: 'index.html',
      controller: 'FontController'
    })
    $urlRouterProvider.otherwise('/');
  }
})()



