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
      templateUrl: '/templates/fontgen.html'
    })
    .state('about', {
      url:'/about',
      templateUrl: '/templates/about.html'
    })
    .state('profile', {
      url:'/profile',
      templateUrl: '/templates/profile.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup.html',
      controller: 'UserController'
    })

    $urlRouterProvider.otherwise('/');
  }
})()



