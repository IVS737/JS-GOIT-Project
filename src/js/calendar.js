// import datepicker from 'js-datepicker';
// import datepicker from 'js-datepicker';
import Notiflix from 'notiflix';
import NewsServise from './newslist.js';
const LogNews = new NewsServise();
import {mar} from './searchform';
import {Value} from './searchform';
import createEmptyMarkup from './renderEmptyMarkup';
// import {change} from './CategoryList/categoryList';
// import {category} from './CategoryList/categoryList';
import makeMarkup from './CardRender/cardRender';
// const picker = datepicker(, options);
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const refs = {
    form: document.querySelector('.header-search-form'),
    input: document.querySelector('.header-search-input'),
    submitButton: document.querySelector('.header-button-makesearch'),
    openInputButton: document.querySelector('.header-button-opensearch'),
    withoutNewsContainer: document.querySelector('.container__error'),
    newsList: document.querySelector('.wrapper__list'),
    weatherContainer: document.querySelector('.news__weather')
  };
  
  const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList, weatherContainer } = refs;
  
  
localStorage.removeItem("date");
const options = {
    dateFormat: "Y-m-d",
    // altFormat: "DD-MM-YYYY",
    minuteIncrement: 1,
    onClose(selectedDates) { 
        if (selectedDates[0] > new Date()) {
          Notiflix.Notify.warning('Please do not choose a date in the future');
          selectedDates = null;
      }
      else{
        
         const chosenYear = selectedDates[0].getFullYear();
         const chosenMonth = selectedDates[0].getMonth() + 1;
        
        const chosenDay= selectedDates[0].getDate();
        const fullDate = `${chosenYear}-${addLeadingZero(chosenMonth)}-${addLeadingZero(chosenDay)}`;

   
      localStorage.setItem("date", fullDate);
     
      if(mar === 1){

        LogNews.query = Value;
        LogNews.NewDate = localStorage.getItem("date");
        LogNews.getSerchDateList().then((data) => {
            
            if (data.response.docs.length === 0) {
                form.reset();
                newsList.innerHTML = '';
                return createEmptyMarkup();
                
              }makeMarkup(data.response.docs)});
      }
    else if(Value.length ===0){ 
      LogNews.NewDate = localStorage.getItem("date");
    //   console.log(LogNews.NewDate);
      LogNews.getdatelist().then((data) => {
        if (data.response.docs.length === 0) {
          form.reset();
          newsList.innerHTML = '';
          return createEmptyMarkup();
          
        }
        makeMarkup(data.response.docs)});
    }
    }}
        
    
  };
flatpickr('input#calendarChuse', options);

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }