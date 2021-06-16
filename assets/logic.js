var apiKey = "89e1dd605080547acf5ebc5c895d51ad"



$(".search-button").click(function(){
    
    currentForecast();
    fiveDayForecast();
})

var currentForecast = function(){
    var citySearched = "Austin"
    //$(".city-search").val();

    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&units=imperial" + "&appid=" + apiKey

    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var currentDate = moment().format('L');
        var weatherIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        var currentTemp = data.main.temp 
        var currentWind = data.wind.speed
        var currentHumidity = data.main.humidity + "%"
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var uvIndex;

        var currentUVIndex ="http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        
        fetch(currentUVIndex)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            uvIndex = data.value;
            $("#current-UVIndex").html("<p id='uv-index'> UV Index: <span id='uv-color'>" + uvIndex + "</span></p>")

            //color UV index 
            if (uvIndex >= 11){
                $("#uv-color").css("background-color", "purple");
                $("#uv-color").css("color", "White");
            } else if (uvIndex < 11 && uvIndex > 7){
                console.log("very high");
                $("#uv-color").css("background-color", "red");
                $("#uv-color").css("color", "White");
            } else if (uvIndex < 8 && uvIndex > 5){
                $("#uv-color").css("background-color", "orange");
            } else if (uvIndex < 6 && uvIndex > 2){
                $("#uv-color").css("background-color", "yellow");
            } else if (uvIndex <= 2 && uvIndex > 0){
                $("#uv-color").css("background-color", "green");
                $("#uv-color").css("color", "White");
            }
        })

        $("#current-city").html("<h1>" + citySearched + " (" + currentDate + ")</h1>");
        $("#weather-img").html("<img src='" + weatherIcon + "'></img>")
        $("#current-temp").html("<p> Temp: " + currentTemp + "&#8457 </p>")
        $("#current-wind").html("<p> Wind: "+ currentWind +" MPH</p>")
        $("#current-humidity").html("<p> Humidity: " + currentHumidity + "</p>")
 
    })

}

var fiveDayForecast = function(){
    var citySearched = "Austin"
    //$(".city-search").val();

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&units=imperial" + "&appid=" + apiKey
    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (i=1; i < data.list.length; i++){
            var weatherIcon = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            var futureTime = data.list[i].dt_txt.substr(11,18)
            var forecastWindSpeed = data.list[i].wind.speed
            var forecastTemp = data.list[i].main.temp
            var forecastHumidity = data.list[i].main.humidity

            if (futureTime === "12:00:00"){
                console.log(forecastTemp)
                console.log(forecastWindSpeed)
                console.log(forecastHumidity)
            }

            
        }
    })
}
currentForecast();
fiveDayForecast();
