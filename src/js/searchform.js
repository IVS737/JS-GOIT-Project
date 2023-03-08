import { format } from 'date-fns';

import changeFilterName from './filteredPagination';
import imagesDesc from '../images/notfoundDesc.png';
import imagesTab from '../images/notfoundTab.png';
import imagesMob from '../images/notfoundMob.png';

const refs = {
  form: document.querySelector('.header-search-form'),
  input: document.querySelector('.header-search-input'),
  submitButton: document.querySelector('.header-button-makesearch'),
  openInputButton: document.querySelector('.header-button-opensearch'),
  withoutNewsContainer: document.querySelector('.container__error'),
  newsList: document.querySelector('.wrapper__list'),
  weatherContainer: document.querySelector('.news__weather'),
};

const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList, weatherContainer } = refs;

const KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';
// form.addEventListener('submit', onFormSubmit);
openInputButton.addEventListener('click', onOpenInputButtonClick);

let value = '';

function onFormSubmit(event) {
  value = event.currentTarget.elements.newsField.value.trim();
  event.preventDefault();

  // fetchNews(value)
  //   .then((data) => {
  //     if (data.response.docs.length === 0) {
  //       form.reset();
  //       newsList.innerHTML = '';
  //       return createEmptyMarkup();
  //     }
  //     // makeMarkup(data.response.docs);
  //     return data.response.docs;
  //   })
  //   .catch(onError);
}

function fetchNews(value) {
  return fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${KEY}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    },
  );
}

function createEmptyMarkup() {
  const emptyMarkup = `<h2 class="withoutnews-title">We haven’t found news from <br> this category</h2><picture>
                  <source
                    media="(min-width:1280px)"
                    srcset="${imagesDesc}"
                  />

                  <source
                    media="(min-width:768px)"
                    srcset="
                      ${imagesTab}
                    "
                  />

                  <img
                    srcset="
                      ${imagesMob}
                    "
                    alt="There aren't news"
                    src="${imagesMob}"
                    loading="lazy"
                    class="withoutnews-image"
                  />
                </picture>`;
  weatherContainer.innerHTML = '';
  withoutNewsContainer.innerHTML = emptyMarkup;
}

function onError(error) {
  createEmptyMarkup();
  console.log(error);
}

function onOpenInputButtonClick(event) {
  openInputButton.style.display = 'none';
  form.style.display = 'block';
}

newsList.addEventListener('click', addToFavorite);

function addToFavorite(event) {
  if (event.target.dataset.action === 'favourite-button') {
    let cardItem = event.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(cardItem);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (event.target.classList.contains('removefavourite-button')) {
      const updatedFavorites = favorites.filter((id) => id !== cardItem);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      event.target.textContent = 'Add to favorites';
      event.target.classList.remove('removefavourite-button');
    } else {
      favorites.push(cardItem);
      localStorage.setItem('favorites', JSON.stringify(favorites));

      event.target.textContent = 'Remove from favorites';
      event.target.classList.add('removefavourite-button');
    }
  }
}
