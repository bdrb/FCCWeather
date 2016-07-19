
var app = {};
	app.apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139";
	app.apiUrlGet = function(coord){
	    return "http://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lon +"&APPID=5442ef930ed995579c363b55b8d13a4c";
	}
	app.weatherGet = function(coord){
	    //$("#weather").load(app.apiUrlGet(coord));
	    $.get(app.apiUrlGet(coord),function(data, status){
	    	$("#weather").text(data);
	    })
    }

$(document).ready(function(){
	app.weatherGet({"lon":139,"lat":35});
});

