var inputEl = document.getElementById("form-input");
var searchButtonEl = document.getElementById("search-button");
var cityButtonEl = document.getElementById("city-buttons");
var currentCityEl = document.getElementById ("current-city")
var currentWeatherEl = document.getElementById("current-weather")
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvEl = document.getElementById("uv")
var fiveDayEl = document.querySelectorAll(".fiveDay");
var cityHistory = JSON.parse(localStorage.getItem("city")) || [];


var apiKey =  "438ec97184afe633108bea6618c47685"


searchButtonEl.addEventListener("click", function () {
    var city = inputEl.value;
    // cityHistory.push(city);
    // localStorage.setItem("city", JSON.stringify(city));
    showHistory();
    checkWeather(city);

})


function showHistory () {

    for (var i = 0; i < cityHistory.length; i++) {
        var cityButton = document.createElement("button");
        cityButton.setAttribute("class", "city-buttons");
        cityButton.dataset.city = cityHistory[i];
        cityButton.textContent = cityHistory[i];
        cityButtonEl.append(cityButton);
            // cityButton.addEventListener("click", function () {
            //     checkWeather(cityButton.value);
            // })
        }

}

showHistory();

function checkWeather(currentCity) {
    var currentCity= "Durham";
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + apiKey + "&units=imperial";
    console.log (weatherUrl);


    fetch (weatherUrl).then(function (response){
        if (response.ok) {
            response.json().then (function(data) {


                // var weatherIcon = (response.weather.icon);
                currentCityEl.innerHTML = currentCity  +  " ("  + moment().format("MMM Do YY") + ")" ;
                
                var weatherIcon = document.createElement ("img");
                weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
                weatherIcon.setAttribute("alt", "icon of current weather");
                weatherIcon.setAttribute("class", "currentIcon");
                currentWeatherEl.append(weatherIcon);
                tempEl.innerHTML = "Temperature: " + Math.floor(data.main.temp) + " &deg;F";
                windEl.innerHTML = "Wind: " + Math.floor(data.wind.speed) + " MPH";
                humidityEl.innerHTML = "Humidity: " + (data.main.humidity) + "%";

                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey ;
                console.log (uvUrl)
                fetch (uvUrl).then(function (response){
                    if (response.ok) {
                        response.json().then (function(data) {
                            if (data.current.uvi< 4 ) {
                                uvEl.setAttribute("class", "badge badge-success");
                            }
                            else if (data.current.uvi < 8) {
                                uvEl.setAttribute("class", "badge badge-warning");
                            }
                            else {
                                uvEl.setAttribute("class", "badge badge-danger");
                            }
                            uvEl.innerHTML = "UV index: " + (data.current.uvi);
                        })

                        var cityID = (data.id)
                        console.log (cityID)
                        var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey + "&units=imperial";
                        console.log(fiveDayUrl)
                        fetch (fiveDayUrl).then (function(response) {
                            if (response.ok) {
                                response.json().then(function(data) {

                                    //iterate through 5 days of weather
                                    for (i = 0; i < fiveDayEl.length; i++)  {
                                        //display dates
                                        var getFiveDays = document.createElement ("h4");
                                        getFiveDays.innerHTML = "(" + moment().add(i + 1, "days").format("MM/DD") + ")";
                                        fiveDayEl[i].append(getFiveDays);

                                        //display icon
                                        var fiveDayIconEl = document.createElement("img");
                                        fiveDayIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                                        fiveDayIconEl.setAttribute("alt", "icon of forecasted weather");
                                        fiveDayEl[i].append(fiveDayIconEl);

                                        // display temps
                                        var fiveDayTempEl = document.createElement("p");
                                        fiveDayTempEl.innerHTML = "Temp: " + Math.floor(data.list[i].main.temp) + " &#176F";
                                        fiveDayEl[i].append(fiveDayTempEl);
                                       
                                        //display humidity
                                        var fiveDayHumidityEl = document.createElement("p");
                                        fiveDayHumidityEl.innerHTML = "Humidity: " + (data.list[i].main.humidity) + "%";
                                        fiveDayEl[i].append(fiveDayHumidityEl);

                                        //display wind speed
                                        var fiveDayWindEl = document.createElement("p");
                                        fiveDayWindEl.innerHTML = "Wind: " + Math.floor(data.list[i].wind.speed) + " MPH";
                                        fiveDayEl[i].append(fiveDayWindEl);

                                    }
                                })
                            }
                        })
                    }
                })
            })
        }
    })
}

// var formSubmitHandler = function(event) {
//     event.preventDefault();

//      // create a container and link for each city
//      var cityEl = document.createElement('a');
//      cityEl.classList = 'city-buttons list-item flex-row justify-space-between align-center';
//      cityEl.setAttribute("href", "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey);

//      // append to container
//      cityEl.appendChild(cityButtonEl);

//     // if (cityName) {
    //     getCityData(cityName);
    //     inputEl.value = "";
    // } else {
    //     alert("Please enter a city");
    // }
    // console.log(event);
// };




// var getCityData = function(city) {

//     var cityApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
// }


checkWeather();