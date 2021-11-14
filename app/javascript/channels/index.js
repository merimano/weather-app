// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

const channels = require.context('.', true, /_channel\.js$/)
channels.keys().forEach(channels)

import mapboxgl from 'mapbox-gl';

const geoCode = document.querySelector("form");
const searchAdress = document.querySelector("#search-text");
const presentCoordinates = document.querySelector("#coordinates");

// REACT ON USER BEHAVIOR //

// Create a variable selecting the button.
// When someone clicks the button (submits). Eventlistener on submit,


const findLocation = () => {
geoCode.addEventListener('submit', (event) => {
  const mapURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchAdress.value}.json?access_token=pk.eyJ1IjoibWVyaWVtbWFuIiwiYSI6ImNrcTE2eGJ4bDAzcXYydW9haHg4ajJjM2IifQ.g4VKjFtpTIigp1EUIEtPxg`;
  event.preventDefault();
  fetch(mapURL)
    .then(response => response.json())
    .then((data) => {
      const longitude = data.features[0].geometry.coordinates[0];
      const latitude = data.features[0].geometry.coordinates[1];
      console.log(longitude);
      console.log(latitude);
      presentCoordinates.innerText = `${longitude}, ${latitude}`;
      mapboxgl.accessToken = 'pk.eyJ1IjoibWVyaWVtbWFuIiwiYSI6ImNrcTE2eGJ4bDAzcXYydW9haHg4ajJjM2IifQ.g4VKjFtpTIigp1EUIEtPxg';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [longitude, latitude],
        zoom: 12
      });
    });
});
};

const weatherItems = document.querySelector("#temperature");
let locationIcon = document.querySelector('.weather-icon');

const findIcon = () => {
geoCode.addEventListener('submit', (event) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchAdress.value}&units=metric&appid=218d99297f505cd632a2bb953b908279`;
  event.preventDefault();
  fetch(weatherURL)
    .then(response => response.json())
    .then((data) => {
      const weatherType = data.weather[0].main;
      const weatherIcon = data.weather[0].icon;
      const weatherTemp = data.main.temp;
      console.log(weatherType);
      console.log(weatherIcon);
      console.log(weatherTemp);
      weatherItems.innerText = `${weatherTemp} degrees`;
      locationIcon.innerHTML = `<img src="openweathermap-api-icons/icons/${weatherIcon}.png">`;
    });
});
};

export { findLocation, findIcon};


