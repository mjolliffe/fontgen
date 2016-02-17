(function(){
"use strict"

angular
  .module('Font')
  .config(AppRoutes);

AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

function AppRoutes($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('fontgen', {
      url:'/',
      templateUrl: 'fontgen.html',
      controller: 'FontController'
    })
    .state('about', {
      url:'/about',
      templateUrl: 'about.html',
      controller: 'FontController'
    })
    .state('profile', {
      url:'/profile',
      templateUrl: 'profile.html',
      controller: 'FontController'
    })
    $urlRouterProvider.otherwise('/');
  }
})()



