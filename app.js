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
weatherApp.controller('forecastController',['$scope', '$resource','cityService',function($scope,$resource,cityService){
    $scope.city = cityService.city; 
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=d14393814dda4b847414e440512198a0",{callback: "JSON_CALLBACK"}, { get:{method:"JSONP"}});
   
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city,cnt:2});
    
    $scope.convertToDate= function(dt){
        return Date(dt);
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
        
        });
    

});


