//Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);
 

weatherApp.service('cityService',function(){
    
   this.city = 'Newyork , NY' ;
    
});

weatherApp.controller('homeController',['$scope','cityService',function($scope,cityService){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city',function(){        
        cityService.city= $scope.city;
    } );
    
}]);
weatherApp.controller('forecastController',['$scope','$routeParams', '$resource','cityService',function($scope,$routeParams,$resource,cityService){
    $scope.city = cityService.city; 
    
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=d14393814dda4b847414e440512198a0&units=metric",{callback: "JSON_CALLBACK"}, { get:{method:"JSONP"}});
   
    $scope.days = $routeParams.days || 3;
                                            
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city,cnt:$scope.days});
    
    $scope.convertToDate= function(dt){
        
        var utcSeconds = dt;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        return d;
    }
    
}]);

weatherApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'pages/home.html'  ,
            controller:'homeController'
        
        })    
        .when('/forecast',{
        
            templateUrl:'pages/forecast.html',
            controller:'forecastController'
        
        })
        .when('/forecast/:days',{
        
            templateUrl:'pages/forecast.html',
            controller:'forecastController'
        
        });
    

});


