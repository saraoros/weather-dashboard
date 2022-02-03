var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#citySearch");
var cityHistoryEl = document.getElementById("history");
var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={113200bab49467606bb2319ca3ecb8e8}';

var getCityName = function() {
    var response = fetch("https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={113200bab49467606bb2319ca3ecb8e8}").then(function(response) {
        response.json().then(function(data) {
            console.log(data);

    });
})
}



var getWeather = function() {
    //
    var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={113200bab49467606bb2319ca3ecb8e8}';
   
    // make a get request to weather api
fetch(weatherApi)
.then(function (response) {
    //
    if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
            var cityName = data.city.name;
            console.log(data.items);
            //
        });
    } else {
        alert('Error: ' + response);
    }
})
.catch(function (error) {
    alert('Unable to connect to Weather Data');
  });

}





// search history doesn't work
function renderSearchHistory() {
    cityHistoryEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
            getWeather(historyItem.value);
        })
        cityHistoryEl.append(historyItem);
    }
}





var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
     //   get
    }
    console.log(event);
}



userFormEl.addEventListener("submit", formSubmitHandler);