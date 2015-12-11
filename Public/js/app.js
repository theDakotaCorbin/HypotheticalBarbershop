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
  
  .state('login', {
    url: '/login',
    templateUrl: '../Views/loginView.html',
    controller: 'loginViewCtrl'
  })

  .state('gallery', {
    url: '/photogallery',
    templateUrl: '../Views/galleryView.html',
    controller: 'galleryCtrl'
  })
  
  $urlRouterProvider.otherwise('/home');

})