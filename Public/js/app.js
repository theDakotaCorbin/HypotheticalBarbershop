angular.module('barberApp', ['ui.router'])

.config(function($urlRouterProvider, $stateProvider){
    
    
    
    $stateProvider
    
    .state('home', {
        url: '/home',
        templateUrl: '../Views/homeView.html',
        controller: 'homeCtrl'
    })
    
    .state('book', {
        url: '/book',
        templateUrl: '../Views/bookView.html',
        controller: 'bookCtrl'
    })
    
    
    
  
 
    $urlRouterProvider.otherwise('/home');
    
    
})