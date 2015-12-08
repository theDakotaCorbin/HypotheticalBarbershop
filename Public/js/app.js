angular.module('barberApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider) {

  $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: '../Views/homeView.html',
    controller: 'homeCtrl'
  })
  
 
  
  .state('viewAppts', {
    url: '/viewappointments',
    templateUrl: '../Views/apptView.html',
    controller: 'apptViewCtrl'
  })
  
  $urlRouterProvider.otherwise('/home');

})