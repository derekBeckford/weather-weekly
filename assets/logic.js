var apiKey = "89e1dd605080547acf5ebc5c895d51ad";
var search = 0;
var searchedCities = JSON.parse(localStorage.getItem("Cities")) ?? [];
window.onload = function () {
  currentForecast();
};

$(".search-button").click(function () {
  currentForecast();
  showCities();
});

var currentForecast = function (city = "") {
  var citySearched = city !== "" ? city : $(".city-search").val();

  if (citySearched === "") {
    citySearched = "Austin";
  }
  citySearched = citySearched.toUpperCase();
  if (searchedCities.indexOf(citySearched) === -1) {
    searchedCities.push(citySearched);
  }

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearched +
    "&units=imperial" +
    "&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentDate = moment().format("L");
      var weatherIcon =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      var currentTemp = data.main.temp;
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity + "%";
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var uvIndex;

      var currentUVIndex =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;

      fetch(currentUVIndex)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          uvIndex = data.value;
          $("#current-UVIndex").html(
            "<p id='uv-index'> UV Index: <span id='uv-color'>" +
              uvIndex +
              "</span></p>"
          );

          //color UV index
          if (uvIndex >= 11) {
            $("#uv-color").css("background-color", "purple");
            $("#uv-color").css("color", "White");
          } else if (uvIndex < 11 && uvIndex > 8) {
            $("#uv-color").css("background-color", "red");
            $("#uv-color").css("color", "White");
          } else if (uvIndex < 8 && uvIndex > 5) {
            $("#uv-color").css("background-color", "orange");
          } else if (uvIndex < 6 && uvIndex > 2) {
            $("#uv-color").css("background-color", "yellow");
          } else if (uvIndex <= 2 && uvIndex > 0) {
            $("#uv-color").css("background-color", "green");
            $("#uv-color").css("color", "White");
          }
        });

      $("#current-city").html(
        "<h1>" + citySearched + " (" + currentDate + ")</h1>"
      );
      $("#weather-img").html("<img src='" + weatherIcon + "'></img>");
      $("#current-temp").html("<p> Temp: " + currentTemp + "&#8457 </p>");
      $("#current-wind").html("<p> Wind: " + currentWind + " MPH</p>");
      $("#current-humidity").html("<p> Humidity: " + currentHumidity + "</p>");
    });
  search++;

  localStorage.setItem("Cities", JSON.stringify(searchedCities));
  fiveDayForecast(citySearched);
};

var fiveDayForecast = function (city = "") {
  var citySearched = city;

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    citySearched +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var day = 1;
      $("#five-day").empty();
      for (var i = 0; i < data.list.length; i++) {
        var weatherIcon =
          "https://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
        var futureDate = moment(data.list[i].dt_txt).format("L");
        var forecastWindSpeed = data.list[i].wind.speed;
        var forecastTemp = data.list[i].main.temp;
        var forecastHumidity = data.list[i].main.humidity;

        var dayTime = data.list[i].dt_txt.substr(11, 18);

        if (dayTime === "12:00:00") {
          $("#five-day").append(`<div id="day-${day}" class ="card"></div>`);
          $(`#day-${day}`).append(
            `<div class='forecast-temp date'>${futureDate} </div>`
          );
          $(`#day-${day}`).append(
            `<div class='forecast-temp info'><img src=" ${weatherIcon}"></img></div>`
          );
          $(`#day-${day}`).append(
            `<div class='forecast-temp info'>Temp: ${forecastTemp}&#8457 </div>`
          );
          $(`#day-${day}`).append(
            `<div class='forecast-wind-speed info'>Wind: ${forecastWindSpeed} MPH</div>`
          );
          $(`#day-${day}`).append(
            `<div class='forecast-humidity info'>Humidity: ${forecastHumidity}</div>`
          );
        }

        day++;
      }
    });
};

var showCities = function () {
  $("#prior-cities").empty();
  var priorCities = $("#prior-cities");
  for (var i = 0; i < searchedCities.length; i++) {
    var city = searchedCities[i];
    priorCities.prepend(
      `<button type="button" class="city-button list-group-item previous-list" onclick="currentForecast('${city}')">${city}</button>`
    );
  }
};

showCities();
