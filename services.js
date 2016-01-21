weatherApp.service('cityService',function(){
    
   this.city = 'Newyork , NY' ;
    
});

weatherApp.service('weatherService',['$resource',function($resource){
    
    this.GetWeather = function(city,days){
        
         var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=d14393814dda4b847414e440512198a0&units=metric",{callback: "JSON_CALLBACK"}, { get:{method:"JSONP"}});
    
                                            
        return weatherAPI.get({q:city,cnt:days});
    };
   
    
}]);