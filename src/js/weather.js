import '../sass/_weatherBlock.scss'
import '../sass/_weatherForecast.scss'

import moment from 'moment';
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const URL2 = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'be0f81a8f9f4c462088b51501fa506a7'

const weatherTemp = document.getElementById("weather-block-temp");
const weatherDescription = document.getElementById("weather-block-description");
const weatherName = document.getElementById("weather-block-name");
const weatherIcon = document.getElementById("weather-block-icon");
const weatherDate = document.getElementById("weather-block-date");
const loadWeather = document.getElementById("load-weather-button");
const forDayEl = document.getElementById("for-day");
const forWeekEl = document.getElementById("for-week");

const weatherLoader = document.getElementById('weather-loader')
weatherLoader.remove()

day =  moment(new Date()).format('ddd')
date = moment(new Date()).format('DD MMM YYYY')


const fetchWeatherGeo = async (lat=33.44, lon=-94.04, units='metric') => {
 
  const { data } = await axios.get(`${URL}/?lat=${lat}&lon=${lon}&units=${units}&exclude=deyly&APPID=${API_KEY}`);
     return data;
 
 }


const geoWeatherApp = () => {
     
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        const units = 'metric'
    

      fetchWeatherGeo(lat, lon, units)
           .then(renderWeather)
            .catch(error => {});
      }) ??
      fetchWeatherGeo()
           .then(renderWeather)
            .catch(error => {});
   
    }
    
const renderWeather = (weather) => {
  forDayEl.classList = "weatherBlock_clear";
  forWeekEl.classList = "weatherBlock_clear hidden";


  weatherTemp.innerHTML = Math.round(weather?.main.temp) ?? "";
  weatherDescription.innerHTML = weather?.weather[0].description ?? "";
  weatherDescription.innerHTML = weather?.weather[0].description ?? "";
  weatherName.innerHTML = weather?.name ?? "";
  weatherIcon.innerHTML = `<img class="weatherBlock_city-icon" src="https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png" />`;
  weatherDate.innerHTML = `${day} <br> ${date}`;

  loadWeather.textContent = 'weather for week'

  loadWeather.classList.add("weatherBlock_weatherBtn")
  loadWeather.classList.remove("weatherForecast_weatherBtn")
}

geoWeatherApp();

// // ----------------------------- 7 DAY -------------------------------


const fetchWeatherForecast = async (lat=33.44, lon=-94.04, units='metric') => {
 
  const { data } = await axios.get(`${URL2}?lat=${lat}&lon=${lon}&units=${units}&APPID=${API_KEY}`);
     console.log(data)
     return data;
 }

 const geoWeatherForecast = () => {
     
    navigator.geolocation.getCurrentPosition(function(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    const units = 'metric'


    fetchWeatherForecast(lat, lon, units)
    .then(renderWeatherForecast)
        .catch(error => {});
  }) ??
  fetchWeatherForecast()
  .then(renderWeatherForecast)
        .catch(error => {});

}

 const renderWeatherForecast = obj => {
             console.log('вот прогноз', obj)

             forDayEl.classList = "weatherBlock_clear hidden";
             forWeekEl.classList = "weatherBlock_clear";

             const day0 = obj.list[0];
             const day1 = obj.list[8];
             const day2 = obj.list[16];
             const day3 = obj.list[24];
             const day4 = obj.list[32];
             const day5 = obj.list[39];
           
             weatherDescription.innerHTML = `Jast Now`;
           
             forWeekEl.innerHTML = `<ul class="weatherForecast_week-info-grid">
           
             <li class="weatherForecast_item weatherForecast_item-a">
             <p class="weatherForecast_item-a"> 5-DAY Forecast ${moment(new Date(day0.dt * 1000)).format("LT")}</p>
             </li>
           
             <li class="weatherForecast_item">
             <p class="weatherForecast_item-temp">${Math.round(day1.main.temp)} <sup>&deg;</sup></p>
             <p class="weatherForecast_item-info"> ${moment(new Date(day1.dt * 1000)).format("ddd DD MMM")} </p>
             </li>
             <li class="weatherForecast_item">
             <p class="weatherForecast_item-temp">${Math.round(day2.main.temp)} <sup>&deg;</sup></p>
             <p class="weatherForecast_item-info"> ${moment(new Date(day2.dt * 1000)).format("ddd DD MMM")} </p>
             </li>
             <li class="weatherForecast_item">
             <p class="weatherForecast_item-temp">${Math.round(day3.main.temp)} <sup>&deg;</sup></p>
             <p class="weatherForecast_item-info"> ${moment(new Date(day3.dt * 1000)).format("ddd DD MMM")} </p>
             </li>
             <li class="weatherForecast_item">
             <p class="weatherForecast_item-temp">${Math.round(day4.main.temp)} <sup>&deg;</sup></p>
             <p class="weatherForecast_item-info"> ${moment(new Date(day4.dt * 1000)).format("ddd DD MMM")} </p>
             </li>
             <li class="weatherForecast_item">
             <p class="weatherForecast_item-temp">${Math.round(day5.main.temp)} <sup>&deg;</sup></p>
             <p class="weatherForecast_item-info"> ${moment(new Date(day5.dt * 1000)).format("ddd DD MMM")} </p>
             </li>
             </ul>
           `;

           
           loadWeather.innerHTML = 'weather for day'
           loadWeather.classList.add("weatherForecast_weatherBtn")
           loadWeather.classList.remove("weatherBlock_weatherBtn")
            }



            document.addEventListener("click", (event)=>{
              if(event.target?.classList.contains("weatherBlock_weatherBtn")){ 
                // console.log('Покажи прогноз неделя')   
                geoWeatherForecast()   
              
              }
              })

              document.addEventListener("click", (event)=>{
                if(event.target?.classList.contains("weatherForecast_weatherBtn")){        
                  // console.log('Покажи прогноз 5дней')    
                  geoWeatherApp()
                }
              }
                  )

export default geoWeatherApp();
