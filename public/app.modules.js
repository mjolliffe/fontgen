(function(){
"use strict"

angular
  .module('Font', ['ui.router', 'ngAnimate'])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });
})()
