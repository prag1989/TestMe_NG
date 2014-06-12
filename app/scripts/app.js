/*jshint unused: vars */
define(['angular', 'controllers/main'] /*deps*/ , function(angular, MainCtrl) /*invoke*/ {
  'use strict';

  return angular.module('testmeNgApp', ['testmeNgApp.controllers.MainCtrl',
      /*angJSDeps*/
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'devBackend'
    ])
    .config(function($routeProvider, $httpProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          resolve: {
            fields: function($http) {
              return $http.get('/fields').then(function(response) {
                return response.data;
              });
            }
          }
        })
        .when('/results', {
          templateUrl: 'views/results.html',
          controller: function($scope, results){
            $scope.results = results;
          },
          resolve: {
            results: function($http) {
              return $http.get('/results').then(function(response) {
                return response.data;
              });
            }
          }
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});