const apiKey = 'aba2f6be860a56fbac91ec1c39046476';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const bgVideo = document.getElementById('bg-video');
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    alert('Invalid Location');
  } else {
    var data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = 'images/clouds.png';
      bgVideo.querySelector('source').src = 'gifs/clouds.mp4';
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = 'images/clear.png';
      bgVideo.querySelector('source').src = 'gifs/clear.mp4';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = 'images/rain.png';
      bgVideo.querySelector('source').src = 'gifs/rain.mp4';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'images/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = 'images/mist.png';
    }
    bgVideo.load();

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}
searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
  searchBox.value = '';
});
searchBox.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    checkWeather(searchBox.value);
    searchBox.value = '';
  }
});
