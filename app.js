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
app.items.weather.main = "Group of weather parameters (Rain, Snow, Extreme etc.)";
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

        function descrGet(descr){
            var res = "";
            path = app.items;
            for(var i = 0; i < descr.length; i++){
                path = path[descr[i]];
            }
            if(typeof path == "object"){
                path =  "";
            }
            return path;
        }
        
        function itemShow(dt, lvl, descr) {
            var lastElem = $("#" + lvl);
            var descrLocal = [];
            for (var i = 0; i < descr.length; i++){
                descrLocal.push(descr[i]);
            }
            for (var i = 0; i < Object.keys(dt).length; i++) {
                var key = Object.keys(dt)[i];
                descr.push(key);
                if (typeof dt[key] == "object") {
                    
                    $(lastElem.append("<ul id = '" + key + "'>" + key +  "</ul>"));

                    if (Array.isArray(dt[key])) {
                        for (var ii = 0; ii < dt[key].length; ii++) {
                            itemShow(dt[key][ii], key, descrLocal);
                        }
                    } else {
                        
                        itemShow(dt[key], key, descrLocal);
                    }
                } else {
                    $(lastElem.append("<li id = '" + key + "'>" + descrGet(descrLocal) + "(" + key + "): " + dt[key] + "</li>"));
                    }
                }
            }
        itemShow(data, "weather-container", [] );
        });
    
};


$(document).ready(function () {

    var a = $("#weather-container");
    var b = $("#weather-fontainer");

    app.weatherGet({
        "lon": 139,
        "lat": 35
    });
});

