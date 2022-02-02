



var getWeather = function() {
    //
    var weatherApi = 'https://api.openweathermap.org/data/2.5/onecall'
   
    // make a get request to weather api
fetch(weatherApi)
.then(function (response) {
    //
    if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
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