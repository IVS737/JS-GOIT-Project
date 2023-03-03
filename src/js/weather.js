import '../sass/_weatherForecast.scss'

import moment from 'moment';
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const URL2 = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'be0f81a8f9f4c462088b51501fa506a7'

const weatherWeek = document.querySelector('#weatherWeek');
const weatherEl = document.querySelector('.news__weather'); 



day =  moment(new Date()).format('ddd')
date = moment(new Date()).format('DD MMM YYYY')


const fetchWeatherGeo = async (lat=90.0000, lon=-135.0000, units='metric') => {
//   console.log('Есть гео')
 
  const { data } = await axios.get(`${URL}/?lat=${lat}&lon=${lon}&units=${units}&exclude=deyly&APPID=${API_KEY}`);
    //  console.log (data);
     return data;
 
 }

const weatherApp = () => {
  geoWeatherApp()
    }

const geoWeatherApp = () => {
      
      navigator.geolocation.getCurrentPosition(function(position) {
        // console.log(position.coords.latitude, position.coords.longitude);
        const lat = position.coords.latitude
        const lon = position.coords.longitude
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
// console.log(weather.main.temp, weather.name, Math.round(weather.main.temp), weather.weather[0].icon, weather.weather[0].description, new Date().getDay(), new Date().getDate(), new Date().getFullYear(), new Date().getMonth());
// console.log(`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`);

weatherEl.innerHTML = `
        
        <div class="weather_main-container">

        <div class="weather_weather-nav">
        <div class="weather_city-temp">
        ${Math.round(weather.main.temp)}
            <p class="weather_temp-sup"><sup>&deg;</sup></p>
        </div>
  
        <div class="weather_city-info">
            <p class = "weather_weather-description">${weather.weather[0].description}</p>
            <p class = "weather_city-name">
                <span class = "weather_weather-name">${weather.name}</span>

            </p>
        
      </div>
    </div>
          
              <div class="weather_info-icon">
                  <img class="weather_city-icon" src="${`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}" alt="${weather.weather[0].description}"/>
              </div>
  
              <div  class = "weather_info-down">
                <p class="weather_info-date"> ${day} <br> ${date} </p>
                <button  type="button" class="weather_weatherBtn" id="loadWeater">weather for week</button>
             </div>
        `
}

weatherApp();

export default weatherApp;


// ----------------------------- 7 DAY -------------------------------


const fetchWeather7day = async (lat=90.0000, lon=-135.0000, units='metric') => {
  console.log('Есть гео')
 
  const { data } = await axios.get(`${URL2}?lat=${lat}&lon=${lon}&units=${units}&APPID=${API_KEY}`);
  console.log(data)
     return data;
 
 }


 function fetchTemp () {
    fetchWeather7day()
    // .then(response => {
    //     if (!response.ok) {
    //         console.log('Oops, there is no country with that name');
    //       } else return response.json();
    //     })
    .then(data => {
            const day1 = data.list[8]
            const day2 = data.list[16]
            const day3 = data.list[24]
            const day4 = data.list[32]

             console.log(day1.dt_txt, day1.main.temp, day1.weather[0].description)
             console.log(day2.dt_txt, day2.main.temp, day2.weather[0].description)
             console.log(day3.dt_txt, day3.main.temp, day3.weather[0].description)
             console.log(day4.dt_txt, day4.main.temp, day4.weather[0].description)

          
            //  weatherWeek.innerHTML =  `
            //       <div class="weather_week-card">
            //       <div class="weather_week-info">
            //       <p class="weather_week-item"><b>*</b>${day1.dt_txt} ${Math.round(day1.main.temp)} <sup>&deg;</sup> ${day1.weather[0].description}</p>
            //         <p class="weather_week-item"><b>*</b>${day2.dt_txt} ${Math.round(day2.main.temp)} <sup>&deg;</sup>${day2.weather[0].description}</p>
            //         <p class="weather_week-item"><b>*</b>${day3.dt_txt} ${Math.round(day3.main.temp)} <sup>&deg;</sup>${day3.weather[0].description}}</p>
            //         <p class="weather_week-item"><b>*</b>${day4.dt_txt} ${Math.round(day4.main.temp)} <sup>&deg;</sup> ${day4.weather[0].description}}</p>
            //       </div>
            //     </div>`;
            }
    )
            }

        
            fetchTemp ()      

        // const weatherBtn = document.querySelector('#weatherWeek');
        // weatherBtn.addEventListener('click', fetchTemp)
 

     
 