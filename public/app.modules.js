(function(){
"use strict"

angular
  .module('Font', ['ui.router'])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });
})()
