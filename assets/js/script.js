// start of global variable declarations
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#citySearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var cityHistoryEl = document.getElementById('history');
var searchEl = document.getElementById('searchbtn');
var apiId = '113200bab49467606bb2319ca3ecb8e8';
var saveSearch = JSON.parse(localStorage.getItem('search')) || [ ];
var response = cityInputEl;
var cityNameEl = document.getElementById('cityName');
var iconEl = document.getElementById('icon');
var tempEl = document.getElementById('temperature');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvIndexEl = document.getElementById('uv');
// var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + '&q=' + city +'&units=imperial' + '&appid=' + apiId;
// var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?';



// var getCityName = function () {
//    var queryString = document.location.search;
//    var cityInput = queryString.split('=')[1];

//    if (cityInput) {
//        //display city name on the page
//         cityInputEl.textContent = cityInput;

//         getCityWeather(cityInput);
// //    } else {
// //        // if an error occurs
// //        (function () {
// //         alert('Unable to connect to Weather Data');
// //    }
// }
// }

  
  var getCityWeather = function (cityName) {
    // format the api url
    var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?' + '&q=' + cityName +'&units=imperial' + '&appid=' + apiId;
  
    // make a get request to weather api
    fetch(weatherApi).then(function (response) {
        //request was successful
        if (response.ok) { 
          response.json().then(function (data) {
            displayWeatherError(data);
           console.log(data.items);

            //
            currentWeatherEl.classList.remove("d-none");
            // start of B.C. code reference with modifications

            // Parse response to display current weather
            var currentDate = Date.getDate(response.data.dt * 1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            cityNameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            var weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            iconEl.setAttribute("alt", response.data.weather[0].description);
            tempEl.innerHTML = "Temperature: " + (response.data.main.temp) + " &#176F";
            humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            windEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";










          });
        } else {
          alert('Error: ' + 'Unable to connect to Weather Data');
        }
      })
    
      .catch(function (error) {
        alert();
      
      });
  };
  
var displayWeatherError = function (currentTemp) {
  if (currentTemp.length === 0) {
    currentWeatherEl.textContent = 'We are unable to connect to the weather data at this time.';
    return;
  }
}



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
//getCityWeather();