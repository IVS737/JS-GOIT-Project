
export default class NewsApiService{
  URL = 'https://api.nytimes.com/svc/news/v3/content';
  KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';
    constructor(){
        this.categoryList = [];
        this.limit = 8;
        this.nameCategory = 'all';
    }
  fetchCategory(){ 
        return fetch(`${this.URL}/section-list.json?api-key=${this.KEY}`)
        .then(response => {
            if (response.ok) {
                return response.json();
                }
        }).catch(err => {
            console.error(err);
            })
    }
      set categoryListArray(data){
        this.categoryList = [...data];
      }
      get categoryListArray(){
       return this.categoryList;
      }

  fetchNewsListOfCategory() {
        return fetch(`${this.URL}/all/${this.nameCategory}.json?limit=${this.limit}&api-key=${this.KEY}`)
        .then(response => {
            if (!response.ok) { 
              throw new Error('Network response was not ok');
            }
            return response.json();
        })      
    }
      set changeCategory(category){
           this.nameCategory = category;
      }
      set limitValue(value){
        this.limit = value;
      }
  }