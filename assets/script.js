var inputEl = document.getElementById("form-input");
var searchButtonEl = document.getElementById("search-button");
var cityButtonEl = document.getElementById("city-buttons")
var cityHistory = JSON.parse(localStorage.getItem("city")) || [];


var apiKey =  "438ec97184afe633108bea6618c47685"


searchButtonEl.addEventListener("click", function () {
    const city = inputEl.value;
    cityHistory.push(city);
    localStorage.setItem("city", JSON.stringify(city));
    showHistory();

})


function showHistory () {
    cityButtonEl.innerHTML = "";
    for (let i = 0; i < cityHistory.length; i++) {
        var cityButton = document.createElement("input");
        cityButton.setAttribute("type", "text");
        cityButton.setAttribute("readonly", true);
        cityButton.setAttribute("class", "city-buttons");
        cityButton.setAttribute("value", cityHistory[i]);
        cityButtonEl.append(cityButton);
            cityButton.addEventListener("click", function () {
                checkWeather(cityButton.value);
            })
        }

}

showHistory();

function checkWeather() {
    
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


