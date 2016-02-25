// const HEROKU_URL = 'https://fontgen.herokuapp.com/';
const HEROKU_URL = 'http://localhost:8080/';

(function(){
"use strict"

angular
  .module('Font', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });
})()
