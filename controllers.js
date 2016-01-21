
weatherApp.controller('homeController',['$scope','cityService','$location',function($scope,cityService,$location){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city',function(){        
        cityService.city= $scope.city;
    } );
    
    $scope.submit = function(){
        $location.path("/forecast");
    };
}]);

weatherApp.controller('forecastController',['$scope','$routeParams','cityService','weatherService',function($scope,$routeParams,cityService,weatherService){
    $scope.city = cityService.city; 
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherResult = weatherService.GetWeather($scope.city,$scope.days);
    
    
    $scope.convertToDate= function(dt){
        
        var utcSeconds = dt;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        return d;
    }
    
}]);