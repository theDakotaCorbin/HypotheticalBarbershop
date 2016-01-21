angular.module('barberApp')

.controller('apptViewCtrl', function ($scope, mainService, authService) {
    mainService.getAppt().then(function (response) {
        $scope.appts = response.data
        console.log(response);
    })
    mainService.getAllBarbers().then(function (response) {
        $scope.barbers = response.data
        console.log(response);
    })
    $scope.newAppt = function (appt) {
        mainService.newAppt(appt).then(function (response) {
            console.log(response);
            mainService.getAppt().then(function (response) {
                $scope.appts = response.data
                console.log(response);
            })
        })
    }

    $scope.deleteAppt = function (appt) {
        mainService.deleteAppt(appt).then(function (response) {
            console.log(response);
            mainService.getAppt().then(function (response) {
                $scope.appts = response.data
                console.log(response);
            })
        });
    }

    $scope.logout = function () {

        authService.logout()

    }

    $scope.barberFilter1 = function () {
        var day = new Date();

        var month = day.getMonth() + 1;

        var days = day.getDate();

        var year = day.getFullYear();

        $scope.today = {
            barber: 'David Barber',
            date: year + '-' + '0' + month + '-' + days
        };
        console.log($scope.today);

    }
    $scope.barberFilter2 = function () {
        var day = new Date();

        var month = day.getMonth() + 1;

        var days = day.getDate();

        var year = day.getFullYear();

        $scope.today = {
            barber: 'Daniel Barber',
            date: year + '-' + '0' + month + '-' + days
        };
        console.log($scope.today);

    }

    $scope.todayFilter = function () {

        var day = new Date();

        var month = day.getMonth() + 1;

        var days = day.getDate();

        var year = day.getFullYear();

        $scope.today = {
            date: year + '-' + '0' + month + '-' + days
        };
        console.log($scope.today);

    }

    $scope.tomorrowFilter = function () {

        var day = new Date();

        var month = day.getMonth() + 1;

        var days = day.getDate() + 1;

        var year = day.getFullYear();

        $scope.today = {
            date: year + '-' + '0' + month + '-' + days
        };
        console.log($scope.tomorrow);
    }

    $scope.clearFilter = function () {
        console.log("xxx");
        $scope.today = {};
    };

})




//SERVICE
.service('mainService', function ($http) {
    this.getAppt = function () {
        return $http.get('/api/Appts')
    }
    this.getAllBarbers = function () {
        return $http.get('/api/Barbers')
    }
    this.newAppt = function (newAppt) {
        return $http.post('/api/newAppt', newAppt)
    }
    this.deleteAppt = function (deleteAppt) {
        return $http({
            method: 'DELETE',
            url: '/api/delete/' + deleteAppt
        }).then(function (resp) {
            return resp;
        });

    };

});