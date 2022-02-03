// global variables
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#citySearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityHistoryEl = document.getElementById('history');
var searchEl = document.getElementById('searchbtn');
var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?';
var apiId = '113200bab49467606bb2319ca3ecb8e8';
var saveSearch = JSON.parse(localStorage.getItem('search')) || [ ];

// var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + city + '&appid=' + apiId;












// start of search history, search history doesn't work
function citySearchHistory() {
  cityHistoryEl.innerHTML = ' ';
  for (let i = 0; i < saveSearch.length; i++) {
    var historyInput = document.createElement('input');
    this.setAttribute('type', 'button');
    this.setAttribute('class', 'form-control d-block bg-white');
    this.setAttribute('value', saveSearch[i]);
    this.addEventListener('click', function () {
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
