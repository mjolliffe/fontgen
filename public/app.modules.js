(function(){
"use strict"

angular
  .module('Font', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });
})()
