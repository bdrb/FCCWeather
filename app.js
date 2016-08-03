var app = {};
app.apiUrlGet = function (coord, units) {
    return "http://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lon + "&units="+ units + "&APPID=5442ef930ed995579c363b55b8d13a4c"; //&units=imperial
};
//-----------------------------------
app.items = {
        "dt": "Time of data calculation, unix, UTC", //1470052227,
//        "id": "City ID", //1851632,
        "name": "City name", //"Shuzenji",
//        "cod": "Internal parameter", //200
    "sys": {
//          "type": "Internal parameter", //3,
//            "id": "Internal parameter", //10354,
//            "message": "Internal parameter", //0.0285,
            "country": "Country code (GB, JP etc.)", //"JP",
            "sunrise": "Sunrise time, unix, UTC", //1469994844,
            "sunset": "Sunset time, unix, UTC", //1470044797
        },
        "coord": {
            "lon": "City geo location, longitude", //138.93,
            "lat": "City geo location, latitude", //34.97
        },
        "weather": [{
            "id": "Weather condition id", //501,
            "main": "Group of weather parameters (Rain, Snow, Extreme etc.)", //"Rain",
            "description": "Weather condition within the group", //"moderate rain",
            "icon": "Weather icon id" //"10n"
        }],
        //"base": "Internal parameter", //"stations",
        "main": {
            "temp": "Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.", //299.66,
            "pressure": "Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa", //1008,
            "humidity": "Humidity, %", //58,
            "temp_min": "Minimum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.", //299.26,
            "temp_max": "Maximum temperature at the moment. This is deviation from current temp that is possible for large cities and megalopolises geographically expanded (use these parameter optionally). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.", //300.37
        },
        "wind": {
            "speed": "Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.", //1.03,
            "deg": "Wind direction, degrees (meteorological)", //132,
            "gust": "gust" //1.54
        },
        "rain": {
            "3h": "Rain volume for the last 3 hours", //8.72
        },
        "snow": {
            "3h": "Snow volume for the last 3 hours", //8.72
        },
        "clouds": {
            "all": "Cloudiness, %" //92
        }
        
        
    }
//-----------------------------------

app.elemAppend = function(parentElem, key, descr, dt, isContainer){
    if(isContainer){
        $(parentElem.append("<ul id = '" + key + "'></ul>"));;    
    }else{
        $(parentElem.append("<li id = '" + key + "'>" + dt + " (" + key + "): " + descr + "</li>"));        
    }
    
}

app.weatherGet = function (coord) {

    $.get(app.apiUrlGet(coord), function (data, status) {

        function itemShow(descr, dt, parent) {
            var parentElem = $("#" + parent);
            for (var i = 0; i < Object.keys(descr).length; i++) {
                var key = Object.keys(descr)[i];

                if (typeof descr[key] == "object") {
                                        
                    app.elemAppend(parentElem, parent + "-" + key, descr[key], dt[key], true);
                                        
                    if (Array.isArray(descr[key])) {
                        for (var ii = 0; ii < descr[key].length; ii++) {
                            itemShow(descr[key][ii], dt[key][ii], parent + "-" + key);
                        }
                    } else {

                        itemShow(descr[key], dt[key], parent + "-" + key);
                    }
                } else {
                    if (dt !== undefined) {
                        app.elemAppend(parentElem, parent + "-" + key, descr[key], dt[key], false);
                    }

                }
            }
        }
        itemShow(app.items, data, "weather-container");
    });

};


$(document).ready(function () {
    app.weatherGet(
        { "lon": 139, "lat": 35 },
        "metric"
    );
});
