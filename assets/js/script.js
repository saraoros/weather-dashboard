// start of global variable declarations
var userFormEl = document.querySelector('#user-form');
var clearButton = document.getElementById('clearBtn')
var cityInputEl = document.querySelector('#citySearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityHistoryEl = document.getElementById('history');
var searchEl = document.getElementById('searchbtn');
var apiId = '113200bab49467606bb2319ca3ecb8e8';
var saveSearch = JSON.parse(localStorage.getItem('search')) || [ ];
var cityNameEl = document.getElementById('cityName');
var iconEl = document.getElementById('icon');
var tempEl = document.getElementById('temperature');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvIndexEl = document.getElementById('uv');

// var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + '&q=' + city +'&units=imperial' + '&appid=' + apiId;

var getCityWeather = function (cityName) {
  // format the api url
  var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + '&q=' + cityName +'&units=imperial' + '&appid=' + apiId;
axios.get(weatherApi).then(function (response) {
  // make a get request to weather api
 
   currentWeatherEl.classList.remove("d-none");


// weather icons
var currentWeatherIcon = response.data.weather[0].icon;
iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png");
iconEl.setAttribute("alt", response.data.weather[0].description);
tempEl.innerHTML = "Temperature: " + (response.data.main.temp) + " &#176F";
humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
windEl.innerHTML = "Wind: " + response.data.wind.speed + " MPH";
        

 // lat & lon

 var lat = response.data.coord.lat;
 var lon = response.data.coord.lon;
 var latLonUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiId;
 axios.get(latLonUrl)


});
    }


var displayWeatherError = function (currentTemp) {
if (currentTemp.length === 0) {
  currentWeatherEl.textContent = 'We are unable to connect to the weather data at this time.';
  return;
}
}


  


// start of search history
function citySearchHistory() {
  cityHistoryEl.innerHTML = '';

  for (let i = 0; i < saveSearch.length; i++) {
    var historyInput = document.createElement('input');
    historyInput.setAttribute('type', 'button');
    historyInput.setAttribute('class', 'form-control d-block bg-white');
    historyInput.setAttribute('value', saveSearch[i]);
    historyInput.addEventListener('click', function () {
    getCityWeather(historyInput.value);
    });
    cityHistoryEl.append(historyInput);
  }
}

// save history to localStorage
searchEl.addEventListener('click', function () {
  var searchCity = cityInputEl.value;
  getCityWeather(searchCity);
  saveSearch.push(searchCity);
  localStorage.getItem('search', JSON.stringify(saveSearch));
  localStorage.setItem('search', JSON.stringify(saveSearch));
  citySearchHistory();
})

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    //   get
  }
  console.log(event);
};


// Clear History button
clearButton.addEventListener('click', function() {
  localStorage.clear();
  cityHistoryEl.remove();
  searchHistory = [];
  citySearchHistory();
})



userFormEl.addEventListener('submit', formSubmitHandler);