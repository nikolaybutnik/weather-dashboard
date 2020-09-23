# Project 6: Weather Dashboard

Project 6 for Carleton University Coding Bootcamp. This project focused on creating a weather display system that returns weather data when user searches by location name. The user is then presented with current weather data, as well as a forecast for the next five days. Weather is updated every three hours.
[Link to application](https://nikolaybutnik.github.io/weather-dashboard/)

![Weather Dashboard Image](https://github.com/nikolaybutnik/weather-dashboard/blob/master/weather-dashboard-screenshot.png?raw=true)

## Purpose

The purpose of this application is to help the user get immediate information on weather conditions anywhere in the world, as well as provide a bird's eye view on the upcoming week's weather conditions. The application is aimed at a weather-conscious user to assist with planning ahead.

## Instructions

Upon opening the web page, the user will be presented with a search bar. Enter a location and click the **search** button. The relevant information will be displayed to the right of the search bar.

The following information will be displayed (note that data is updated in three hour increments):

- Current location and date.
- Icon indicating current weather conditions.
- Temperature in degrees celsius.
- Humidity percentage.
- Wind speed in miles per hour.
- UV index color coded based on severity.
- A card for each of the next five days, containing date, weather icon, temperature, and humidity level for the particular day.

The search result will also be entered under **Recent Searches** and can be clicked to bring up the result for that location. The app will save the user's last search, whether done form the search bar or the recent searches section. All the above information will automatically be displayed once the page loads if the search has been made before.

## Built With

- HTML
- CSS
- JavaScript
- Bootstrap
- OpenWeatherMap API
