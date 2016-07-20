
var app = {};
	app.apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139";
	app.apiUrlGet = function(coord){
	    return "http://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lon +"&APPID=5442ef930ed995579c363b55b8d13a4c";
	}
	app.weatherGet = function(coord){
	    //$("#weather").load(app.apiUrlGet(coord));
	    $.get(app.apiUrlGet(coord),function(data, status){
	    	$("#weather").text(data);

             /*
      {"coord":{"lon":139,"lat":35},
      "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
      "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
      "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
      "wind":{"speed":7.31,"deg":187.002},
      "rain":{"3h":0},
      "clouds":{"all":92},
      "dt":1369824698,
      "id":1851632,
      "name":"Shuzenji",
      "cod":200}
    */

    $("#lat").text(data.coord.lat);
    $("#lon").text(data.coord.lon);        
    //<div id = "sys">
    $("#country").text(data.sys.country);
    $("#sunrise").text(data.sys.sunrise);
    $("#sunset").text(data.sys.sunset);
//        <div id = "weather">
    $("#wid").text(data.weather[0].id);
    $("#main").text(data.weather[0].main);
    $("#description").text(data.weather[0].description);
    $("#icon").text(data.weather[0].icon);
    //    </div>
    $("#temp").text(data.main.temp);
    $("#humidity").text(data.main.humidity);
    $("#pressure").text(data.main.pressure);
    $("#temp_min").text(data.main.temp_min);
    $("#temp_max").text(data.main.temp_max);
    //    </div>
    //    <div id = "wind">
    $("#speed").text(data.wind.speed);
    $("#deg").text(data.wind.deg);
    //    </div>
    //    <div id = "rain">
    $("#3h").text(data.rain.3h);
    //    </div>
    //    <div id = "clouds">
    $("#all").text(data.clouds.all);
    //    </div>
    $("#dt").text(data.dt);
    $("#id").text(data.id);
    $("#name").text(data.name);
    $("#cod").text(data.cod);
*/
            
	    })
    }

$(document).ready(function(){

       
	app.weatherGet({"lon":139,"lat":35});
});

