
import axios from "axios";
const mainURL = 'https://api.nytimes.com/svc/search/v2';
const KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';

  export default class NewsApiServise {
    constructor() {
      this.news = "";
      this.filter = "sports";
      this.date = "";
      this.page=1;
      this.limit = 10;
    };

  async getFullNewsList() {
        const url =`${mainURL}/articlesearch.json?limit=${this.limit}&q=${this.news}&fq=news_desk:(${this.filter}) AND pub_date:(${this.date})&page=${this.page}&api-key=${KEY}`;
        const response = await axios.get(url);  
        return response.data
    }
    async getSerchFilterList() {
      const url =`${mainURL}/articlesearch.json?&q=${this.news}&fq=news_desk:(${this.filter})limit=${this.limit}&api-key=${KEY}`;
      const response = await axios.get(url);  
      return response.data
  } 
  async getSerchDateList() {
    const url =`${mainURL}/articlesearch.json?limit=${this.limit}&q=${this.news}&fq=pub_date:${this.date}&api-key=${KEY}`;
    const response = await axios.get(url);  
    return response.data
} 
async getSerchList() {
  const url =`${mainURL}/articlesearch.json?limit=${this.limit}&q=${this.news}&api-key=${KEY}`;
  const response = await axios.get(url);  
  return response.data
} 
async getfilterdatelist() {
    const url =`${mainURL}/articlesearch.json?limit=${this.limit}&fq=news_desk:(${this.filter}) AND pub_date:(${this.date})&api-key=${KEY}`;
    const response = await axios.get(url);  
    return response.data
}
async getfilterlist() {
    const url =`${mainURL}/articlesearch.json?limit=${this.limit}&fq=news_desk:(${this.filter})&api-key=${KEY}`;
    const response = await axios.get(url);  
    return response.data
}
async getdatelist() {
    const url =`${mainURL}/articlesearch.json?limit=${this.limit}&fq=pub_date:(${this.date})&api-key=${KEY}`;
    const response = await axios.get(url);  
    return response.data
}
async getToplist() {
    const url =`https://api.nytimes.com/svc/topstories/v2/world.json?&api-key=${KEY}`;
    const response = await axios.get(url);  
    return response.data
}

setlimitValue(value){
    this.limit = value;
  }
setNewFilter(newfilter){
    this.filter = newfilter;
  }
setNewDate(newdate){
    this.date = newdate;
  }

 get query() {
        return this.news;
      }
 set query(newSearch) {
        this.news = newSearch;
      }
      
  };
