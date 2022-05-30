var inputEl = document.getElementById("form-input");
var searchButtonEl = document.getElementById("search-button");
var cityButtonsEl = document.getElementById("city-buttons");
var currentCityEl = document.getElementById("current-city");
var currentWeatherEl = document.getElementById("current-weather");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvEl = document.getElementById("uv");
var fiveDayEl = document.querySelectorAll(".fiveDay");
var fiveDaysEl = document.querySelector(".five-day-cards")

var apiKey = "438ec97184afe633108bea6618c47685";

//Start main function
function checkWeather(currentCity) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(weatherUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        
        currentCityEl.innerHTML =
          currentCity + " (" + moment().format("MMM Do YY") + ")";
        var weatherIcon = document.createElement("img");
        weatherIcon.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
        );
        weatherIcon.setAttribute("alt", "icon of current weather");
        weatherIcon.setAttribute("class", "currentIcon");
        currentCityEl.append(weatherIcon);
        tempEl.innerHTML =
          "Temperature: " + Math.floor(data.main.temp) + " &deg;F";
        windEl.innerHTML = "Wind: " + Math.floor(data.wind.speed) + " MPH";
        humidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";

        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var uvUrl =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          apiKey;
        fetch(uvUrl).then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              if (data.current.uvi < 4) {
                uvEl.setAttribute("class", "badge badge-success");
              } else if (data.current.uvi < 8) {
                uvEl.setAttribute("class", "badge badge-warning");
              } else {
                uvEl.setAttribute("class", "badge badge-danger");
              }
              uvEl.innerHTML = "UV index: " + data.current.uvi;
            });
            //Start Five Day Forecast
            var cityID = data.id;
            var fiveDayUrl =
              "https://api.openweathermap.org/data/2.5/forecast?id=" +
              cityID +
              "&appid=" +
              apiKey +
              "&units=imperial";
            fetch(fiveDayUrl).then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                    fiveDaysEl.classList.remove("d-none");
                  //iterate through 5 days of weather
                  for (i = 0; i < fiveDayEl.length; i++) {
                    fiveDayEl[i].innerHTML = "";
                    //display dates
                    var getFiveDays = document.createElement("h4");
                    getFiveDays.innerHTML =
                      "(" +
                      moment()
                        .add(i + 1, "days")
                        .format("MM/DD") +
                      ")";
                    fiveDayEl[i].append(getFiveDays);

                    //display icon
                    var fiveDayIconEl = document.createElement("img");
                    fiveDayIconEl.setAttribute(
                      "src",
                      "https://openweathermap.org/img/wn/" +
                        data.list[i].weather[0].icon +
                        ".png"
                    );
                    fiveDayIconEl.setAttribute(
                      "alt",
                      "icon of forecasted weather"
                    );
                    fiveDayEl[i].append(fiveDayIconEl);

                    // display temps
                    var fiveDayTempEl = document.createElement("p");
                    fiveDayTempEl.innerHTML =
                      "Temp: " + Math.floor(data.list[i].main.temp) + " &#176F";
                    fiveDayEl[i].append(fiveDayTempEl);

                    //display humidity
                    var fiveDayHumidityEl = document.createElement("p");
                    fiveDayHumidityEl.innerHTML =
                      "Humidity: " + data.list[i].main.humidity + "%";
                    fiveDayEl[i].append(fiveDayHumidityEl);

                    //display wind speed
                    var fiveDayWindEl = document.createElement("p");
                    fiveDayWindEl.innerHTML =
                      "Wind: " + Math.floor(data.list[i].wind.speed) + " MPH";
                    fiveDayEl[i].append(fiveDayWindEl);
                  }
                });
              }
            });
          }
        });
      });
    }
  });
}

var cityHistory = JSON.parse(localStorage.getItem("city")) || [];

searchButtonEl.addEventListener("click", function () {
  var city = inputEl.value;
  fiveDayEl.innerHTML = "";
  checkWeather(city);
  cityHistory.push(city);
  localStorage.setItem("city", JSON.stringify(cityHistory));
  showHistory();
});

function showHistory() {
  cityButtonsEl.innerHTML = "";
  for (var i = 0; i < cityHistory.length; i++) {
    var cityButtons = document.createElement("button");
    cityButtons.setAttribute("type", "text");
    cityButtons.setAttribute("class", "city-buttons m-1");
    cityButtons.setAttribute("value", cityHistory[i]);
    cityButtons.innerHTML = cityHistory[i];

    cityButtonsEl.append(cityButtons);
    cityButtons.addEventListener("click", function () {
      checkWeather(cityButtons.value);
    });
  }
}

showHistory();
