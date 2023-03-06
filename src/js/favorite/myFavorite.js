import { makeMarkup } from "../searchform";

const favoriteBtn = document.querySelector('[data-action="favorite-button"]');
// const cardItem = document.querySelector('.card-item');
// console.log(cardItem)

if(favoriteBtn) {
  favoriteBtn.addEventListener('click', renderSavedNews);
}

const getFromStorage = key => {
 return JSON.parse(localStorage.getItem('favorites'));
};

renderSavedNews('favorites');

function renderSavedNews(name) {
  // clearNewsList();
  const addedNews = getFromStorage(name);

  if (addedNews && addedNews.length > 0) {
    makeMarkup(addedNews);
  }
}

// function clearNewsList() {
//   cardItem.innerHTML = '';
// }
