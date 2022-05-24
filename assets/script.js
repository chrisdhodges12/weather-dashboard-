var inputEl = document.getElementById("form-input");
var searchButtonEl = document.getElementById("search-button");
var cityButtonEl = document.getElementById("city-buttons")

var cityHistory = [];

var apiKey =  "438ec97184afe633108bea6618c47685"


searchButtonEl.addEventListener("click", function () {
    var city = inputEl.value;
    localStorage.setItem("city", JSON.stringify(city));
    
    var cityButton = document.createElement("button");
    cityButton.setAttribute("class", "city-buttons");
    cityButton.innerHTML = city;
    cityButtonEl.append(cityButton);
    
    

})

// function reset () {
//     inputEl.innerHTML = "";
// }

function showHistory () {
    cityButtonEl = JSON.parse(localStorage.getItem("city"));

}

// var formSubmitHandler = function(event) {
//     event.preventDefault();

//      // create a container and link for each city
//      var cityEl = document.createElement('a');
//      cityEl.classList = 'city-buttons list-item flex-row justify-space-between align-center';
//      cityEl.setAttribute("href", "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey);

//      // append to container
//

// var getCityData = function(city) {

//     var cityApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
// }


showHistory();