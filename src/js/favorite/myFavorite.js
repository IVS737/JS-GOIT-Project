import { getFromStorage } from "./favoriteLocalStorage";
import { makeMarkup } from "../searchform";

const favoriteBtn = document.querySelector('[data-action="favorite-button"]');
const cardItem = document.querySelector('.card-item');

// import { renderCollection } from './create-movie-markup';

if(favoriteBtn) {
  favoriteBtn.addEventListener('click', handleClickFavorite);
}

renderSavedNews('news');

function handleClickFavorite() {
  renderSavedNews('news');
  // removeDisabled(favoriteBtn);
  setDisabled(favoriteBtn);
  true;
  // refs.isWatchTabActive = false;
}

// function handleClickWatched() {
//   renderSavedFilms('watch');
//   setDisabled(refs.watchedButton);
//   removeDisabled(refs.queueButton);
//   refs.isWatchTabActive = true;
// }

function renderSavedNews(name) {
  clearNewsList();
  const addedNews = getFromStorage(name);

  if (addedNews && addedNews.length > 0) {

    makeMarkup(addedNews);

    // refs.noFilmsMessage.classList.add('visually-hidden');
  } else {
    // refs.noFilmsMessage.classList.remove('visually-hidden');
  }
}

function setDisabled(el) {
  el.setAttribute('disabled', '');
  el.classList.add('button-active');
}
function removeDisabled(el) {
  el.removeAttribute('disabled');
  el.classList.remove('button-active');
}
function clearNewsList() {
  // cardItem.innerHTML = '';
}
