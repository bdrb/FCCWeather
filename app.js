var app = {};
app.apiUrl = "api.openweathermap.org/data/2.5/weather?lat=35&lon=139";
app.apiUrlGet = function(coord){
    return "api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lon +"&APPID=5442ef930ed995579c363b55b8d13a4c";
}
app.weatherGet = function(coord){

    $.ajax(
        {
            url: app.apiUrlget(coord);        
        },
        function(result, status){};
        
    );
    
}
