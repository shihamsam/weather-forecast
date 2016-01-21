weatherApp.directive('weatherComponent',function(){
    
    return {
        scope:{
            weatherDay: '=',
            convertToDate: '&',
            dateFormat: '@'
        },
        templateUrl:'weather-component.html',
        replace:true
        
    };
    
});