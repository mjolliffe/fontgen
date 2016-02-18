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
      templateUrl: '/templates/fontgen.html',
      controller: 'FontController'
    })
    .state('about', {
      url:'/about',
      templateUrl: '/templates/about.html',
      controller: 'FontController'
    })
    .state('profile', {
      url:'/profile',
      templateUrl: '/templates/profile.html',
      controller: 'UserController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController'
    })

    $urlRouterProvider.otherwise('/');
  }
})()



