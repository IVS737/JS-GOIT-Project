// import datepicker from 'js-datepicker';
// import datepicker from 'js-datepicker';
import NewsServise from './newslist.js';
const LogNews = new NewsServise();
import {mar} from './searchform';
import {Value} from './searchform';
// import {change} from './CategoryList/categoryList';
// import {category} from './CategoryList/categoryList';
import makeMarkup from './CardRender/cardRender';
// const picker = datepicker(, options);
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
localStorage.removeItem("date");
const options = {
    dateFormat: "Y-m-d",
    // altFormat: "DD-MM-YYYY",
    minuteIncrement: 1,
    onClose(selectedDates) { 
        if (selectedDates[0] > new Date()) {
        console.log('Please choose a date in the future');
        // StartBtn.disabled = true;
      }
      else{console.log(Value);
        chosenYear = selectedDates[0].getFullYear();
        chosenMonth = selectedDates[0].getMonth() + 1;
        console.log(chosenMonth);
        chosenDay= selectedDates[0].getDate();
      fullDate = `${chosenYear}-${addLeadingZero(chosenMonth)}-${addLeadingZero(chosenDay)}`;

    //   console.log(fullDate);
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
      console.log(LogNews.NewDate);
      LogNews.getdatelist().then((data) => {makeMarkup(data.response.docs)});
    }
    }}
        
    
  };
flatpickr('input#calendarChuse', options);

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }