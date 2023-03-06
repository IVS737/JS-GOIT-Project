import axios from "axios";
import { makeMarkup } from "../searchform";
// import { refs } from "../searchform";
import { addToFavorite } from "../searchform";

const KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';

async function fetchGetFavorite() {
  try {
    const getFromStorage = JSON.parse(localStorage.getItem('favorites'));
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${getFromStorage}&api-key=${KEY}`);
    return response.data;
  } catch(error) {
    console.error(error);
  }
}

const favoriteBtn = document.querySelector('[data-action="favourite-button"]');
const newsList = document.querySelector('.wrapper__list');
// const cardItem = document.querySelector('.card-item');
// console.log(cardItem)

if(favoriteBtn) {
  favoriteBtn.addEventListener('click', onNewsCardClick);
}

function onNewsCardClick(e) {
  // e.preventDefault();

    fetchGetFavorite()
      .then(response => {
        newsList.innerHTML = renderSavedNews(response);
        return response;
      })
      .then(response => {
        addToFavorite(response);
      })
      .catch(error => console.log(error));
}

onNewsCardClick()

// const getFromStorage = key => {
//  return JSON.parse(localStorage.getItem('favorites'));
// };

renderSavedNews('favorites');

function renderSavedNews(name) {
  // clearNewsList();
  const addedNews = fetchGetFavorite(name);

  if (addedNews && addedNews.length > 0) {
    makeMarkup(addedNews);
  }
}

// function clearNewsList() {
//   cardItem.innerHTML = '';
// }
