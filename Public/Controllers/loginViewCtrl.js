var app = angular.module('barberApp')
app.controller('loginViewCtrl', function($scope, authService, $location) {

  $scope.signUp = function(user) {
    if ($scope.user.password === $scope.password2) {

      authService.signUp(user).then(function(response) {
        console.log(response);

        return $location.path('/viewappointments');
      });
    } else {
      alert("Oops make sure your passwords match! =]");
    }
  };
  $scope.logIn = function(user) {

    console.log('Giving Service: ', user);

    authService.logIn(user).then(function(response) {
      console.log('response: ', response);

      if (response) {
        if (response.status === 200) {
          return $location.path('/viewappointments');
        }
      } else {
        alert('Invalid Username or Password');
      }

    });

  };

});




//SERVICE
app.service('authService', function($http, $location) {

  this.forceLogin = function() {
    return $http({
      method: 'GET',
      url: '/currentuser'

    }).then(function(res) {
      if (!res || res.status === 401) {
        $location.path('/#/home');

      }

    }, function(err) {
      console.log('not logged in');
      $location.path('/#/logIn');

    })

  }

  this.logout = function() {

    return $http({

      method: 'GET',
      url: '/logout'

    }).then(function() {
      $location.path('/#/login');

    })

  }

  this.logIn = function(user) {
    user.username = user.userName;
    delete user.userName;
    console.log('The User: ', user);
    return $http({
      method: 'PUT',
      url: '/login',
      data: user
    }).then(function(res) {
      return res;
    })
  }

});