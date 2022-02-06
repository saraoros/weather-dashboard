// start of global variable declarations
var userFormEl = document.querySelector('#user-form');
var clearButton = document.getElementById('clearBtn');
var cityInputEl = document.querySelector('#citySearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityHistoryEl = document.getElementById('history');
var searchEl = document.getElementById('searchbtn');
var apiId = '113200bab49467606bb2319ca3ecb8e8';
var saveSearch = JSON.parse(localStorage.getItem('search')) || [];
var cityNameEl = document.getElementById('cityName');
var iconEl = document.getElementById('icon');
var tempEl = document.getElementById('temperature');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var fiveDayAheadEl = document.getElementById('fiveday');
var uvEl = document.getElementById('uv');



// get cities' weather
var getCityWeather = function (cityName) {
  var weatherApi =
    'https://api.openweathermap.org/data/2.5/weather?' + '&q=' + cityName + '&units=imperial' + '&appid=' + apiId;
  axios.get(weatherApi).then(function (response) {
    currentWeatherEl.classList.remove('d-none');

    // start of B.C.
    var currentDate = new Date(response.data.dt * 1000);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    cityNameEl.innerHTML = response.data.name + ' ' + month + '/' + day + '/' + year;

    //weather icons
    var currentWeatherIcon = response.data.weather[0].icon;
    iconEl.setAttribute(
      'src',
      'https://openweathermap.org/img/wn/' + currentWeatherIcon + '@2x.png'
    );
    iconEl.setAttribute('alt', response.data.weather[0].description);
    tempEl.innerHTML = 'Temperature: ' + response.data.main.temp + ' &#176F';
    humidityEl.innerHTML = 'Humidity: ' + response.data.main.humidity + '%';
    windEl.innerHTML = 'Wind: ' + response.data.wind.speed + ' MPH';

    // get lat & lon
    var lat = response.data.coord.lat;
    var lon = response.data.coord.lon;
    var latLonUrl =
      'https://api.openweathermap.org/data/2.5/uvi/forecast?lat=' +
      lat +
      '&lon=' +
      lon +
      '&appid=' +
      apiId;
    axios.get(latLonUrl).then(function (response) {
      var UVIndex = document.createElement('span');
      UVIndex.innerHTML = response.data[0].value;
      uvEl.innerHTML = 'UV Index: ';
      uvEl.append(UVIndex);
    });

    // cities weather 5-day forecast
    var cityFiveDay = response.data.id;
    var fiveDayUrl =
      'https://api.openweathermap.org/data/2.5/forecast?id=' +
      cityFiveDay +
      '&units=imperial' +
      '&appid=' +
      apiId;
    axios
      .get(fiveDayUrl).then(function (response) {
        fiveDayAheadEl.classList.remove('d-none');
        var fiveForeDivs = document.querySelectorAll('.fiveForecast');
        for (i = 0; i < fiveForeDivs.length; i++) {
          fiveForeDivs[i].innerHTML = ' ';
          var fiveIndex = i * 8 + 4;
          var fiveDates = new Date(response.data.list[fiveIndex].dt * 1000);
          var fiveForecastDay = fiveDates.getDate();
          var fiveForecastMonth = fiveDates.getMonth() + 1;
          var fiveForecastYear = fiveDates.getFullYear();
          var showFiveDays = document.createElement('p');
          showFiveDays.setAttribute('class', 'mt-3  fiveDates');
          showFiveDays.innerHTML =
            fiveForecastMonth + '/' + fiveForecastDay + '/' + fiveForecastYear;
          fiveForeDivs[i].append(showFiveDays);

          var citiesFiveForecast = document.createElement('img');
          citiesFiveForecast.setAttribute(
            'src',
            'https://openweathermap.org/img/wn/' +
              response.data.list[fiveIndex].weather[0].icon +
              '@2x.png'
          );
          citiesFiveForecast.setAttribute(
            'alt',
            response.data.list[fiveIndex].weather[0].description
          );
          fiveForeDivs[i].append(citiesFiveForecast);

          var fiveTempEl = document.createElement('p');
          fiveTempEl.innerHTML =
            'Temp: ' + response.data.list[fiveIndex].main.temp + ' &#176F';
          fiveForeDivs[i].append(fiveTempEl);
          var fiveHumidityEl = document.createElement('p');
          fiveHumidityEl.innerHTML =
            'Humidity: ' + response.data.list[fiveIndex].main.humidity + '%';
          fiveForeDivs[i].append(fiveHumidityEl);
        }
      });
  });
};

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
});

var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityInputEl.value.trim();

  if (cityName) {
  
  } else {
      alert('Unable to connect to Weather Data');
  }
  console.log(event);
};

// Clear History button
clearButton.addEventListener('click', function () {
  localStorage.clear();
  cityHistoryEl.remove();
  searchHistory = [];
  citySearchHistory();
});

userFormEl.addEventListener('submit', formSubmitHandler);
