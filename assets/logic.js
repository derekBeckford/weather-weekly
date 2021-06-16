var apiKey = "89e1dd605080547acf5ebc5c895d51ad"



$(".search-button").click(function(){
    
    currentForecast();
})

var currentForecast = function(){
    var citySearched = $(".city-search").val();

    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&units=imperial" + "&appid=" + apiKey

    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
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

        $("#current-city").html("<h1>" + citySearched + "</h1>");
        $("#weather-img").html("<img src='" + weatherIcon + "'></img>")
        $("#current-temp").html("<p> Temp: " + currentTemp + "&#8457 </p>")
        $("#current-wind").html("<p> Wind: "+ currentWind +" MPH</p>")
        $("#current-humidity").html("<p> Humidity: " + currentHumidity + "</p>")
 
    })

}

currentForecast();
