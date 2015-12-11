var app = angular.module('barberApp')
app.controller('loginViewCtrl', function ($scope, authService, $location) {

    $scope.signUp = function (user) {
        if ($scope.user.password === $scope.password2) {


            authService.signUp(user).then(function (response) {
                console.log(response);
                // alert("Thanks for signing up");
                return $location.path('/viewappointments');
            });
        } else {
            alert("Oops make sure your passwords match! =]");
        }
    };
    $scope.logIn = function (user) {


            authService.logIn(user).then(function (response) {
                console.log(response);
                // alert("Thanks for logging in");
                return $location.path('/viewappointments');
            });
        
    };

});



app.service('authService', function ($http, $location) {



//tried logInPage
    this.logIn = function (user) {
        return $http({
            method: 'POST',
            url: '/login',
            data: user
        }).then(function (res) {
            return res;
        }, function (err) {
            if (err.status === 401) {
                $location.path('/logIn');
            }
        })
    }
    
});