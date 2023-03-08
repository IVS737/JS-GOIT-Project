
import axios from "axios";
const mainURL = 'https://api.nytimes.com/svc/search/v2';
const KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';


// document.addEventListener("DOMContentLoaded", function() {
//   getToplist().then((data) => {makeMarkup(data.response.docs)});
// });

export default class NewsServise {
  constructor() {
    this.news = "";
    this.filter = "";
    this.date = "";
    this.page=1;
    this.limit = 10;
  };


async getSerchDateList() {
  const url =`${mainURL}/articlesearch.json?limit=${this.limit}&q=${this.news}&fq=pub_date:${this.date}&api-key=${KEY}`;
  const response = await axios.get(url);  
  return response.data
} 
async  getSerchList() {
const url =`${mainURL}/articlesearch.json?limit=${this.limit}&q=${this.news}&api-key=${KEY}`;
const response = await axios.get(url);  
return response.data
} 
async  getfilterdatelist() {
  const url =`${mainURL}/articlesearch.json?limit=${this.limit}&fq=news_desk:(${this.filter}) AND pub_date:(${this.date})&api-key=${KEY}`;
  const response = await axios.get(url);  
  return response.data
}
async getfilterlist() {
  const url =`${mainURL}/articlesearch.json?limit=${this.limit}&fq=news_desk:(${this.filter})&api-key=${KEY}`;
  const response = await axios.get(url);  
  return response.data
}
async  getdatelist() {
  const url =`${mainURL}/articlesearch.json?limit=${this.limit}&fq=pub_date:(${this.date})&api-key=${KEY}`;
  const response = await axios.get(url);  
  return response.data
}
async getToplist() {
    const url =`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${KEY}`;
    const response = await axios.get(url);  
    return response.data
}


// set LimitValue(value){
//     this.limit = value;
//   }
//   get LimitValue(){
//     this.limit;
//   }
set NewFilter(newfilter){
  this.filter = newfilter;
  
}
get NewFilter(){
  return this.filter 
}

set NewDate(newdate){
  this.date = newdate;
}
get NewDate() {
  return this.date;
}

get query() {
      return this.news;
    }
set query(newSearch) {
      this.news = newSearch;
    }
    
};
