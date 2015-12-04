angular.module('barberApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider) {

  $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: '../Views/homeView.html',
    controller: 'homeCtrl'
  })
  
  .state('createAppt', {
    url: '/createappointment',
    templateUrl: '../Views/apptCreatorView.html',
    controller: 'apptCreatorCtrl'
  })
  
  .state('viewAppts', {
    url: '/viewappointments',
    templateUrl: '../Views/apptView.html',
    controller: 'apptViewCtrl'
  })

  $urlRouterProvider.otherwise('/home');

})