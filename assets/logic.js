var apiKey = "89e1dd605080547acf5ebc5c895d51ad"



$(".search-button").click(function(){
    
    currentForecast();
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
            $("#current-UVIndex").html("<p id='uv-index'> UV Index: " + uvIndex + "</p>")
        })

        $("#current-city").html("<h1>" + citySearched + "</h1>");
        $("#weather-img").html("<img src='" + weatherIcon + "'></img>")
        $("#current-temp").html("<p> Temp: " + currentTemp + "&#8457 </p>")
        $("#current-wind").html("<p> Wind: "+ currentWind +" MPH</p>")
        $("#current-humidity").html("<p> Humidity: " + currentHumidity + "</p>")
        
    })

}

currentForecast();
