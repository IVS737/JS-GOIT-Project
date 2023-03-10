import { format } from 'date-fns';

// import imagesDesc from './images/notfoundDesc.png';
// import imagesTab from './images/notfoundTab.png';
import createEmptyMarkup from './renderEmptyMarkup';
// import imagesMob from './images/notfoundMob.png';
// import imagesDesc from '../images/notfoundDesc.png';
// import imagesTab from '../images/notfoundTab.png';
import NewsServise from './newslist.js';
// import imagesMob from '../images/notfoundMob.png';
// import createEmptyMarkup from './renderEmptyMarkup';
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
// form.addEventListener('submit', onFormSubmit);
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

// function createEmptyMarkup() {
//   const emptyMarkup = `<h2 class="withoutnews-title">We haven’t found news from <br> this category</h2><picture>
//                   <source
//                     media="(min-width:1280px)"
//                     srcset="${imagesDesc}"
//                   />

//                   <source
//                     media="(min-width:768px)"
//                     srcset="
//                       ${imagesTab}
//                     "
//                   />

//                   <img
//                     srcset="
//                       ${imagesMob}
//                     "
//                     alt="There aren't news"
//                     src="${imagesMob}"
//                     loading="lazy"
//                     class="withoutnews-image"
//                   />
//                 </picture>`;
//   weatherContainer.innerHTML = "";
//   withoutNewsContainer.innerHTML = emptyMarkup;
// }

// function makeMarkup(array) {
//   const markUp = array
//     .map((data) => {
//       const subTitle = data.abstract.slice(0, 100) + `...`;
//       const title = data.headline.main.slice(0, 60) + `...`;
//       const date = data.pub_date.toString().slice(0, 10).replace(`-`, '/').replace(`-`, '/');

//       let imageAddress;
//       let imageStartAddress;

//       if (data.multimedia.length === 0) {
//         imageAddress =
//           'https://st.depositphotos.com/1000558/53737/v/1600/depositphotos_537370102-stock-illustration-image-photo-sign-symbol-template.jpg';
//       } else if (data.multimedia.length > 0) {
//         imageStartAddress = 'https://static01.nyt.com/';
//         imageAddress = imageStartAddress + data.multimedia[0].url;
//       }

//       return `<li class = "card-item" data-id = "${data.uri}">

//     <div class="card-wrapper">
//       <div class="card-thumb">
//         <img class="card-image" src = "${imageAddress}" alt = "${data.byline}">
//         <p class="card-news-category">${data.section_name}</p>

//         <p class="card-text-read">Already read</p>
//         <button class="favourite-button" type="button" data-action="favourite-button">Add to favorite</button>

//       </div>
//       <h3 class="card-news-title">${data.headline.main}</h3>
//       <p class="card-news-description">${subTitle}</p>
//       <div class="card-info-container">
//         <p class="card-datetime">${format(new Date(date), 'dd/MM/yyyy')}</p>
//         <a class="card-link" data-id="${data.uri}" data-action="link" "href="${data.web_url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
//       </div>
//     </div>
// </li>`;
//     })
//     .join('');

//   newsList.innerHTML = markUp;
// }

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
  if (event.target.dataset.action !== 'favourite-button') return;

  let card = event.target.parentElement.parentElement.parentElement;
  let cardId = card.dataset.id;

  const image = card.querySelector('.card-image').src;
  const category = card.querySelector('.card-news-category').textContent;
  const title = card.querySelector('.card-news-title').textContent;
  const description = card.querySelector('.card-news-description').textContent;
  const date = card.querySelector('.card-datetime').textContent;
  const newsLink = card.querySelector('.card-link');

  console.log(newsLink);
  const cardObj = {
    id: cardId,
    image,
    category,
    title,
    description,
    date,
    link: newsLink.href,
  };
  console.log(cardObj);
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (event.target.classList.contains('removefavourite-button')) {
    const indexArray = favorites.map((el) => el.title);
    const index = indexArray.indexOf(cardObj.title);

    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // const updatedFavorites = favorites.filter((favorite) => favorite.id == cardItem);
    // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    event.target.textContent = 'Add to favorites';
    event.target.classList.remove('removefavourite-button');
  } else {
    favorites.push(cardObj);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    event.target.textContent = 'Remove from favorites';
    event.target.classList.add('removefavourite-button');
  }
}

//     const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

//     if (event.target.classList.contains('removefavourite-button')) {
//       console.log('bye')
//       // const updatedFavorites = favorites.filter((element) => element.id != cardId);
//       // console.log(updatedFavorites);
//       // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

//       event.target.textContent = 'Add to favorites';
//       // event.target.classList.add('favourite-button');
//       // event.target.classList.remove('removefavourite-button');

//     }
//     if (event.target.classList.contains('favourite-button')) {
//       console.log('hi')
//       // favorites.push(cardObj);
//       // localStorage.setItem('favorites', JSON.stringify(favorites));

//       event.target.textContent = 'Remove from favorites';
//       event.target.classList.remove('favourite-button');
//       event.target.classList.add('removefavourite-button');
//       //
//     }
//   }
// }


// //     if (event.target.classList.contains('favourite-button')) {
// //       const updatedFavorites = favorites.filter((id) => id !== cardItem);
// //       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

// //       event.target.textContent = 'Add to favorites';
// //       event.target.classList.remove('removefavourite-button');
// //     }

newsList.addEventListener('click', addToRead);

function addToRead(event) {

  if (event.target.dataset.action !== 'link') return;
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
  cardHasBeenRead.style.display = "flex";
  card.classList.add("addOverlay");

  if (!readArticles) {
  readArticles.push(cardObj);
  localStorage.setItem('readArticles', JSON.stringify(readArticles));
  } else {  
    
    const newArray = readArticles.sort((element) => element.id === cardObj.id);
    newArray.push(cardObj);
    localStorage.setItem('readArticles', JSON.stringify(readArticles));
  }
}








