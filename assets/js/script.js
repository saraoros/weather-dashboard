var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#citySearch');
var cityHistoryEl = document.getElementById('history');
var searchEl = document.getElementById('searchbtn');
var weatherApi =
  'api.openweathermap.org/data/2.5/weather?q={city name}&appid={113200bab49467606bb2319ca3ecb8e8}';
var saveSearch = JSON.parse(localStorage.getItem('search')) || [];

var getCityName = function () {
  var response = fetch(
    'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={113200bab49467606bb2319ca3ecb8e8}'
  ).get(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

var getWeather = function () {
  //
  var weatherApi =
    'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={113200bab49467606bb2319ca3ecb8e8}';

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
    historyInput.setAttribute('type', 'text');
    historyInput.setAttribute('class', 'form-control d-block bg-white');
    historyInput.setAttribute('value', saveSearch[i]);
    historyInput.addEventListener('click', function () {
      getWeather(historyInput.value);
    });
    cityHistoryEl.append(historyInput);
  }
}

// save history to localStorage
searchEl.addEventListener('click', function () {
  var searchCity = cityInputEl.value;
  getWeather(searchCity);
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
