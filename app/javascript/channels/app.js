import mapboxgl from 'mapbox-gl';

const geoCode = document.querySelector("form");
const searchAdress = document.querySelector("#search-text");
const presentCoordinates = document.querySelector("#coordinates");

// REACT ON USER BEHAVIOR //

// Create a variable selecting the button.
// When someone clicks the button (submits). Eventlistener on submit,


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

const weatherItems = document.querySelector("#temperature");
let locationIcon = document.querySelector('.weather-icon');

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


const getStories = document.querySelector("form");
const presentStories = document.querySelector("#list");

const topStories = [];
const tenTopStoriesIds = [];
const tenTopStories = [];

getStories.addEventListener('submit', (event) => {
  fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
    .then(response => response.json())
    .then((data) => {
      data.forEach((topStory) => {
        topStories.push(topStory);
      });
      for (let i = 0; i < 10; i++) {
        const random = Math.floor(Math.random() * topStories.length);
        tenTopStoriesIds.push(topStories[random]);
      }
      tenTopStoriesIds.forEach((topStory) => {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${topStory}.json`)
          .then(response => response.json())
          .then((data2) => {
            const userId = data2.by;
            fetch(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
              .then(response => response.json())
              .then((data3) => {
                const story = {
                  userId: data2.by,
                  title: data2.title,
                  url: data2.url,
                  timestamp: data2.time,
                  score: data2.score,
                  authorId: data3.id,
                  karmaScore: data3.karma
                };
                tenTopStories.push(story);
                tenTopStories.sort(function(story1, story2) {
                  return story1.score - story2.score;
                });
                console.log(tenTopStories);
                tenTopStories.forEach((eachStory) => {
                  presentStories.insertAdjacentHTML("beforeend",
                    `<li>
                      <p>Title: ${eachStory.title}</p>
                      <p>Author: ${eachStory.userId}</p>
                      <p>URL: ${eachStory.url}</p>
                      <p>Time: ${eachStory.timestamp}</p>
                      <p>Score: ${eachStory.score}</p>
                      <p>Karma: ${eachStory.karmaScore}</p></li>`);
                });
              });
          });
      });
    });
});

/*
const introCoordinates = document.querySelector("#coordinates-text");

geoCode.addEventListener('submit', (event) => {
  event.preventDefault();
  introCoordinates.innerText = `Your coordinates`;
}); */

// new mapboxgl.Marker()
//  .setLngLat([-0.077, 51.533])
//  .addTo(map);
