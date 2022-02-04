// start of global variable declarations
var userFormEl = document.querySelector('#user-form');
var clearButton = document.getElementById('clearBtn')
var cityInputEl = document.querySelector('#citySearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityHistoryEl = document.getElementById('history');
var searchEl = document.getElementById('searchbtn');
var apiId = '113200bab49467606bb2319ca3ecb8e8';
var saveSearch = JSON.parse(localStorage.getItem('search')) || [ ];
// var searchButton = $(".searchButton");
// var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + '&q=' + city +'&units=imperial' + '&appid=' + apiId;


for (var i = 0; i < localStorage.length; i++) {
  var city = localStorage.getItem(i);
  var cityName = $(".list-group").addClass("list-group-item");
  cityName.append("<li>" + city + "</li>");
}


  


// search history doesn't work properly
function citySearchHistory() {
  cityHistoryEl.innerHTML = '';

  for (let i = 0; i < saveSearch.length; i++) {
    var historyInput = document.createElement('input');
    historyInput.setAttribute('type', 'button');
    historyInput.setAttribute('class', 'form-control d-block bg-white');
    historyInput.setAttribute('value', saveSearch[i]);
    historyInput.addEventListener('click', function () {
    // getCityWeather(historyInput.value);
    });
    cityHistoryEl.append(historyInput);
  }
}

// save history to localStorage
searchEl.addEventListener('click', function () {
  var searchCity = cityInputEl.value;
  // getCityWeather(searchCity);
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
clearButton.addEventListener('click', function () {
  localStorage.clear();
  searchHistory = [];
  citySearchHistory();
})



userFormEl.addEventListener('submit', formSubmitHandler);
//getCityWeather();