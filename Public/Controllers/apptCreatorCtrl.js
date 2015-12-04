angular.module('barberApp')

.controller('apptCreatorCtrl', function($scope, mainService) {
  mainService.getAppt().then(function(response) {
  $scope.appts = response.data
        console.log(response);
  })
  $scope.newAppt = function(appt) {
  mainService.newAppt(appt).then(function(response) {
    console.log(response);
       mainService.getAppt().then(function(response) {
  $scope.appts = response.data
        console.log(response);
  })
  }) 
  }
  
  
  $scope.deleteAppt = function(appt) {
    mainService.deleteAppt(appt).then(function(response){
        console.log(response);
             mainService.getAppt().then(function(response) {
  $scope.appts = response.data
        console.log(response);
  })
    });
  }
  
  
})
.service('mainService', function($http) {
    this.getAppt = function () {
        return $http.get('/api/Appts')
    }
    this.newAppt = function (newAppt) {
        return $http.post('/api/newAppt', newAppt)
    }
    this.deleteAppt = function (deleteAppt) {
        return $http({
            method: 'DELETE',
            url: '/api/delete/' + deleteAppt
        }).then(function(resp){
            return resp;
        });
        
    };
    
    
});