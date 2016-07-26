var app = {};
app.apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139";
app.apiUrlGet = function (coord) {
    return "http://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lon + "&APPID=5442ef930ed995579c363b55b8d13a4c";
};

app.items = {};
app.items.coord = {};
app.items.coord.lon = "City geo location, longitude";
app.items.coord.lat = "City geo location, latitude";
app.items.weather = {}; //(more info Weather condition codes)
app.items.weather.id = "Weather condition id";
app.items.weather.main  = "Group of weather parameters (Rain, Snow, Extreme etc.)";
app.items.weather.description = "Weather condition within the group";
app.items.weather.icon = "Weather icon id";
app.items.base = "Internal parameter";
app.items.main = {};
app.items.main.temp = "Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.";
app.items.main.pressure = "Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa";
app.items.main.humidity = "Humidity, %";
app.items.main.temp_min = "Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.";
app.items.main.temp_max = "Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.";
app.items.main.sea_level = "Atmospheric pressure on the sea level, hPa";
app.items.main.grnd_level = "Atmospheric pressure on the ground level, hPa";
app.items.wind = {};
app.items.wind.speed = "Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.";
app.items.wind.deg = "Wind direction, degrees (meteorological)";
app.items.clouds = {};
app.items.clouds.all = "Cloudiness, %";
app.items.rain = {};
app.items.rain["3h"] = "Rain volume for the last 3 hours";
app.items.snow = {};
app.items.snow["3h"] = "Snow volume for the last 3 hours";
app.items.dt = "Time of data calculation, unix, UTC";
app.items.sys = {};
app.items.sys.type = "Internal parameter";
app.items.sys.id = "Internal parameter";
app.items.sys.message = "Internal parameter";
app.items.sys.country = "Country code (GB, JP etc.)";
app.items.sys.sunrise = "Sunrise time, unix, UTC";
app.items.sys.sunset = "Sunset time, unix, UTC";
app.items.id = "City ID";
app.items.name = "City name";
app.items.cod = "Internal parameter";

app.weatherGet = function (coord) {
    //$("#weather").load(app.apiUrlGet(coord));
    $.get(app.apiUrlGet(coord), function (data, status) {

        function itemShow(dt, lvl)
        {
            for(var i = 0; i < Object.keys(dt).length; i++)
            {
                var key = Object.keys(dt)[i];
                if(typeof dt[key] == "object")
                {
                    if(Array.isArray(dt[key]))
                    {
                        for(var ii = 0; ii < dt[key].length; ii++)
                        {
                            itemShow(dt[key][ii], lvl + "@#$" + key);
                        }
                    }
                    else
                    {
                        itemShow(dt[key], lvl + "@#$" + key);
                    }    
                }
                else
                {
                    //$("#" + key  + "").text(lvl + "," + key + ": " + dt[key]);

                    var lvlArr = lvl.split("@#$");
                    lvlArr.push(key);

                    var lastElem = $("#" + lvlArr[0]);
                    for (var i = 1; i < lvlArr.length; i++)
                    {
                       /* if(lastElem == "")
                        {
                            var elems = $("#" + lvlArr[i]);
                        }
                        else
                        {*/
                            var elems = $("#" + lastElem[0].id + ">" + lvlArr[i]);
                       // }
                        if (elems.length == 0){
                            $(lastElem.append("<div id = '" + key  +"'>" + key + ": " + dt[key] + "</div>"));
                            lastElem = $("#" + key);
                        }
                        
                    }

                    
                }
            }
        }
        
        itemShow(data, "weather-container");
        

        //$("#weather-container").text(data);

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
/*
        $("#lat").text("lat:" + data.coord.lat);
        $("#lon").text("lon:" + data.coord.lon);

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
        $("#3h").text(data.rain); //["3h"]);
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

$(document).ready(function () {

    var a = $("#weather-container");
    var b = $("#weather-fontainer");
    
    app.weatherGet({
        "lon": 139,
        "lat": 35
    });
});
