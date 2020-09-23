// Reference HTML elements.
let cityNameEl = document.getElementById("city-name");
let temperatureEl = document.getElementById("temperature");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let uvIndexEl = document.getElementById("uv-index");
let searchBarEl = document.getElementById("search-bar");
let searchButton = document.getElementById("search-btn");
let fiveDayForecastEl = document.getElementById("five-day-forecast");
let searchHistoryEl = document.getElementById("search-history");
let currentWeatherImg = document.getElementById(
  "current-forecast-weather-image"
);

// On startup, check if anything is saved to local storage. If yes, run api to load the data.
if (localStorage.getItem("Weather Dashboard Last Search") !== null) {
  callApi(localStorage.getItem("Weather Dashboard Last Search"));
}

// Make an API call for temperature, humidity, and wind speed. Also make a call for latitude and longitude to be used in a call for UV Index.
function callApi(cityName, verify) {
  // Make a call to API that gets basic weather data and push it onto the screen.
  let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca&units=metric`;
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      let currentDateUnix = data.dt;
      let currentDate = new Date(currentDateUnix * 1000)
        .toISOString()
        .split("T")[0];
      let tempCelsius = data.main.temp.toFixed(0);
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;
      let latitude = data.coord.lat;
      let longitude = data.coord.lon;
      cityNameEl.textContent = `${cityName.toUpperCase()} (${currentDate})`;
      currentWeatherImg.setAttribute(
        "src",
        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );
      currentWeatherImg.setAttribute("style", "display: inline;");
      currentWeatherImg.setAttribute("width", "100px");
      temperatureEl.textContent = `Temperature: ${tempCelsius} °C`;
      humidityEl.textContent = `Humidity: ${humidity}%`;
      windSpeedEl.textContent = `Wind speed: ${windSpeed} MPH`;

      //Forecast cards function and call to 5 day forecast API will go here.
      let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a4bf23428ce5ff544bccc01776c56dca&units=metric`;
      fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          let forecastObj = data;
          // Define a nested function that creates a forecast card and populates it for each of the 5 days.
          let iterator = 5;
          function createForecastCard() {
            let date = forecastObj.list[iterator].dt_txt.substr(0, 10);
            let temp = forecastObj.list[iterator].main.temp.toFixed(0);
            let hum = forecastObj.list[iterator].main.humidity;
            let icon = forecastObj.list[iterator].weather[0].icon;
            const cardHTML = `
            <div class="card-group">
              <div class="card text-white bg-primary mb-2" style="max-width: 12rem; max-height: 15rem; margin-left: 9px; margin-right: 9px; margin-top: 5px;">
                <h6 class="card-header forecast-date">${date}</h6>
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather icon" class="forecast-weather-image"/>
                <div class="card-body">
                  <p class="forecast-temperature">Temp: ${temp} °C</p>
                  <p class="forecast-humidity">Hum: ${hum}%</p>
                </div>
              </div>
            </div>`;
            fiveDayForecastEl.innerHTML += cardHTML;
            iterator += 8;
          }
          // Clear any existing cards form the screen and create 5 day forecast cards.
          document.getElementById("forecast-text").textContent =
            "5 Day Forecast";
          fiveDayForecastEl.innerHTML = "";
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
          if (uvIndex <= 2) {
            uvIndexEl.innerHTML = `UV index: <mark id="green">${uvIndex}</mark>`;
          } else if (uvIndex > 2 && uvIndex <= 5) {
            uvIndexEl.innerHTML = `UV index: <mark id="yellow">${uvIndex}</mark>`;
          } else if (uvIndex > 5 && uvIndex <= 7) {
            uvIndexEl.innerHTML = `UV index: <mark id="orange">${uvIndex}</mark>`;
          } else if (uvIndex > 7 && uvIndex <= 10) {
            uvIndexEl.innerHTML = `UV index: <mark id="red">${uvIndex}</mark>`;
          } else {
            uvIndexEl.innerHTML = `UV index: <mark id="purple">${uvIndex}</mark>`;
          }
          // Verify if search history needs to be updated. Otherwise do nothing.
          if (verify) {
            addSearchHistory();
          }
          // Clear the input field.
          searchBarEl.value = "";
        });
    })
    .catch((err) => console.log(err));
}

// Define a function that adds an entry in "Recent Searches" each time a search is made.
function addSearchHistory() {
  const searchResult = `<li class="list-group-item history-button">${searchBarEl.value.toUpperCase()}</li>`;
  searchHistoryEl.insertAdjacentHTML("afterbegin", searchResult);
  let btnList = document.getElementsByClassName("history-button");
  for (i = 0; i < btnList.length; i++) {
    btnList[i].addEventListener("click", callbackAPI);
  }
}

// Define a click event for the search button that makes a call to the API.
searchButton.addEventListener("click", function () {
  if (searchBarEl.value === "") {
    return;
  }
  // Pass in the name of the city to be used in apiCall above. Also pass in a boolean that will act is a check whether to add the item to search history.
  callApi(searchBarEl.value, true);
  saveSearch(searchBarEl.value);
});

// Define a function that calls the API on search result clicks.
function callbackAPI(event) {
  // Pass in city name obtained from text content of the clicked element. As we don't need to add the item to search history, don't pass in the boolean.
  callApi(event.target.textContent);
  saveSearch(event.target.textContent);
}

// Define a function that saves latest search to local storage.
function saveSearch(cityName) {
  localStorage.setItem("Weather Dashboard Last Search", cityName.toLowerCase());
}
