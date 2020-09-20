// Reference HTML elements.
let cityNameEl = document.getElementById("city-name");
let temperatureEl = document.getElementById("temperature");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let uvIndexEl = document.getElementById("uv-index");
let searchBarEl = document.getElementById("search-bar");
let searchButton = document.getElementById("search-btn");
let fiveDayForecastEl = document.getElementById("five-day-forecast");

// Make an API call for temperature, humidity, and wind speed. Also make a call for latitude and longitude to be used in a call for UV Index.
// *Add error handling if city doesn't exist.*
function callApi() {
  // Get the name of the city.
  let cityName = searchBarEl.value;

  // Clear any existing cards form the screen.
  fiveDayForecastEl.innerHTML = "";

  // Make a call to API that gets basic weather data and push it onto the screen.
  let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca&units=metric`;
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let tempCelsius = data.main.temp.toFixed(0);
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;
      let latitude = data.coord.lat;
      let longitude = data.coord.lon;
      cityNameEl.textContent = `${cityName.toUpperCase()} ${}`;
      temperatureEl.textContent = `Temperature: ${tempCelsius} °C`;
      humidityEl.textContent = `Humidity: ${humidity}%`;
      windSpeedEl.textContent = `Wind speed: ${windSpeed} MPH`;

      //Forecast cards function and call to 5 day forecast API will go here.
      let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca&units=metric`;
      fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          let forecastObj = data;
          // console.log(forecastObj);
          // Define a function that creates a forecast card and populates it for each of the 5 days. Data is taken at midnight.
          let iterator = 0;
          function createForecastCard() {
            let date = forecastObj.list[iterator].dt_txt.substr(0, 10);
            let temp = forecastObj.list[iterator].main.temp.toFixed(0);
            let hum = forecastObj.list[iterator].main.humidity;
            const cardHTML = `
              <div class="card text-white bg-primary mb-2"
                style="max-width: 300px; max-height: 200px; margin-left: 15px; margin-right: 15px;">
                <h6 class="card-header forecast-date">${date}</h6>
                <img src="#" class="forecast-weather-image" />
                <div class="card-body">
                  <p class="forecast-temperature">Temp: ${temp} °C</p>
                  <p class="forecast-humidity">Hum: ${hum}%</p>
                </div>
              </div>`;
            fiveDayForecastEl.innerHTML += cardHTML;
            iterator += 8;
          }
          for (let i = 0; i < 5; i++) {
            createForecastCard();
          }
        });

      // Make a call to API that gets UV data and push it onto the screen.
      let url3 = `https://api.openweathermap.org/data/2.5/uvi?appid=a4bf23428ce5ff544bccc01776c56dca&lat=${latitude}&lon=${longitude}`;
      fetch(url3)
        .then((response) => response.json())
        .then((data) => {
          let uvIndex = data.value;
          uvIndexEl.textContent = `UV Index: ${uvIndex}`;
        });
    });
}

// Define a click event for the search button that makes a call to the api.
searchButton.addEventListener("click", callApi);
