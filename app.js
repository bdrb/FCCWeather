var app = {};
app.apiUrlGet = function (coord, units) {
    return "http://api.openweathermap.org/data/2.5/weather?lat=" + coord.lat + "&lon=" + coord.lon + "&units="+ units + "&APPID=5442ef930ed995579c363b55b8d13a4c"; //&units=imperial
};
//-----------------------------------
app.getDateString = function (v){
  return new Date(Number(v));
}
app.items = {
        "dt": showText("Time of data calculation", app.getDateString),
        "name": showText("City name", function (v){return "<strong>" + v + "</strong>"}), //"Shuzenji",
        "sys": {
            "country": showText("Country code"), //"JP",
            "sunrise": showText("Sunrise time", app.getDateString), //1469994844,
            "sunset": showText("Sunset time", app.getDateString)//"Sunset time, unix, UTC", //1470044797
        },
        "coord": {
            "lon": showText("City geo location, longitude"), //138.93,
            "lat": showText("City geo location, latitude") //34.97
        },
        "weather": [{
            "id": showText("Weather condition id"), //501,
            "main": showText("Group of weather parameters"), //"Rain",
            "description": showText("Weather condition within the group"), //"moderate rain",
            "icon": showText("Weather icon id")//function(val){"Weather icon id: " + val} //"10n"
        }],
        //"base": "Internal parameter", //"stations",
        "main": {
            "temp": showText("Temperature"), //299.66,
            "pressure": showText("Atmospheric pressure, hPa"), //1008,
            "humidity": showText("Humidity, %"), //58,
            "temp_min": showText("Minimum temperature at the moment"), //299.26,
            "temp_max": showText("Maximum temperature at the moment"), //300.37
        },
        "wind": {
            "speed": showText("Wind speed"), //1.03,
            "deg": showText("Wind direction, degrees (meteorological)"), //132,
            "gust": showText("gust") //1.54
        },
        "rain": {
            "3h": showText("Rain volume for the last 3 hours"), //8.72
        },
        "snow": {
            "3h": showText("Snow volume for the last 3 hours"), //8.72
        },
        "clouds": {
            "all": showText("Cloudiness, %") //92
        }


    }
//-----------------------------------
function showText(text, processing = function(v){return v;}){
  return function(val){
     return text + ": " + processing(val);
   };
}
app.elemAppend = function(parentElem, key, descr, dt, isContainer){
    if(isContainer){
        $(parentElem.append("<ul id = '" + key + "'></ul>"));;
    }else{
      if(typeof descr == "function"){
          $(parentElem.append("<li id = '" + key + "'>" + descr(dt) + "</li>"));
      }else{
          $(parentElem.append("<li id = '" + key + "'>" + dt + " (" + key + "): " + descr + "</li>"));
      }

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
app.getCoord = function(){
  var coord = {lon:0,lat:0};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      coord.lat = position.coords.latitude;
      coord.lon = position.coords.longitude;
    });
  }
  return coord;
}

$(document).ready(function () {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      app.weatherGet(
          { "lon": position.coords.longitude, "lat": position.coords.latitude },
          "metric"
      );
      // coord.lat = position.coords.latitude;
      // coord.lon = position.coords.longitude;
    });
  }

    // app.weatherGet(
    //     app.getCoord(),//{ "lon": 139, "lat": 35 },
    //     "metric"
    // );
});
