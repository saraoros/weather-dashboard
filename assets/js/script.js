// global variables
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#citySearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityHistoryEl = document.getElementById('history');
var searchEl = document.getElementById('searchbtn');
var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?';
var apiId = '113200bab49467606bb2319ca3ecb8e8';
var saveSearch = JSON.parse(localStorage.getItem('search')) || [ ];
var response = cityInputEl;
// var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + city + '&appid=' + apiId;


var getCityName = function (response) {
    var response = fetch('https://api.openweathermap.org/data/2.5/weather?' + cityInputEl + '&appid=' + apiId).get(function (response) {
      response.json().then(function (data) {
        console.log(data);
      });
    });
  };
  
  var getCityWeather = function () {
    //
    var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + cityInputEl + '&appid=' + apiId;
  
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
  };
  

// search history doesn't work
function citySearchHistory() {
  cityHistoryEl.innerHTML = ' ';
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
});




var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    //   get
  }
  console.log(event);
};

userFormEl.addEventListener('submit', formSubmitHandler);
