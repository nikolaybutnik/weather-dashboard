// Reference HTML elements.
let cityNameEl = document.getElementById("city-name");
let temperatureEl = document.getElementById("temperature");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let uvIndexEl = document.getElementById("uv-index");

// Get the name if the city.
let cityName = "Ottawa";
cityNameEl.textContent = cityName;

// Make an API call for temperature, humidity, and wind speed. Also make a call for latitude and longitude to be used in a call for UV Index.
// *Add error handling if city doesn't exist.*
let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca`;
fetch(url1)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let tempCelsius = (data.main.temp - 273.15).toFixed(1);
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let latitude = data.coord.lat;
    let longitude = data.coord.lon;
    temperatureEl.textContent = `Temperature: ${tempCelsius} °C`;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    windSpeedEl.textContent = `Wind speed: ${windSpeed} MPH`;

    let url2 = `https://api.openweathermap.org/data/2.5/uvi?appid=a4bf23428ce5ff544bccc01776c56dca&lat=${latitude}&lon=${longitude}`;
    fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let uvIndex = data.value;
        uvIndexEl.textContent = `UV Index: ${uvIndex}`;
      });
  });
