import { format } from 'date-fns';
import createEmptyMarkup from './renderEmptyMarkup';
import NewsServise from './newslist.js';
import geoWeatherApp from './weather';
import makeMarkup from './CardRender/cardRender';
import createEmptyMarkup from './renderEmptyMarkup';
const LogNews = new NewsServise();

const refs = {
  form: document.querySelector('.header-search-form'),
  input: document.querySelector('.header-search-input'),
  submitButton: document.querySelector('.header-button-makesearch'),
  openInputButton: document.querySelector('.header-button-opensearch'),
  withoutNewsContainer: document.querySelector('.container__error'),
  newsList: document.querySelector('.wrapper__list'),
  weatherContainer: document.querySelector('.news__weather'),
  newsContainer: document.querySelector('.news'),
};

//mob menu

const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.burger-btn-open');

const toggleMenu = () => {
  const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');
};

//

const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList, weatherContainer, newsContainer } =
  refs;

const KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';
openInputButton.addEventListener('click', onOpenInputButtonClick);

export let mar = 0;
export let Value = '';

function onFormSubmit(event) {
  Value = event.currentTarget.elements.newsField.value.trim();
  event.preventDefault();
  mar = 1;
  LogNews.query = Value;
  fetchNews(Value)
    .then((data) => {
      if (data.response.docs.length === 0) {
        form.reset();
        newsList.innerHTML = '';
        return createEmptyMarkup();
      }
      if (!localStorage.getItem('date')) {
        LogNews.getSerchList().then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }

          makeMarkup(data.response.docs);
        });
      }
      // else{
      //   LogNews.NewDate = localStorage.getItem("date")
      //   LogNews.getdatelist().then((data) => {makeMarkup(data.response.docs)})
      // }
      makeMarkup(data.response.docs);
      return data.response.docs;
    })
    .catch(onError);

  if (mobileMenu.classList.contains('is-open')) {
    toggleMenu();
  }
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

function onError(error) {
  createEmptyMarkup();
  console.log(error);
}

function onOpenInputButtonClick(event) {
  openInputButton.style.display = 'none';
  form.style.display = 'block';
}

newsList.addEventListener('click', addToRead);

function addToRead(event) {
  if (event.target.nodeName !== 'A') {
    return;
  }
  if (event.target.dataset.action === 'card-link') return;
  const readArticles = JSON.parse(localStorage.getItem('readArticles')) || []; ///масив прочитаних статей
  let card = event.target.parentElement.parentElement.parentElement;
  let cardId = card.dataset.id;

  const image = card.querySelector('.card-image').src;
  const category = card.querySelector('.card-news-category').textContent;
  const title = card.querySelector('.card-news-title').textContent;
  const description = card.querySelector('.card-news-description').textContent;
  const cardDate = card.querySelector('.card-datetime').textContent;
  const newsLink = card.querySelector('.card-link');

  const cardHasBeenRead = card.querySelector('.card-text-read');
  const date = new Date(Date.now()).toISOString();
  const cardObj = {
    id: cardId,
    image,
    category,
    title,
    description,
    watchDate: date.trim(),
    cardDate,
    link: newsLink.href,
  };

  console.log(cardObj);
  cardHasBeenRead.style.display = 'flex';
  card.classList.add('addOverlay');

  if (!readArticles) {
    readArticles.push(cardObj);
    localStorage.setItem('readArticles', JSON.stringify(readArticles));
  } else {
    const newArray = readArticles.sort((element) => element.id === cardObj.id);
    newArray.push(cardObj);
    localStorage.setItem('readArticles', JSON.stringify(readArticles));
  }
}
