import { addToFavorite } from '../searchform';
import { setItemToLocalStorage } from './add-read';

const cardList = document.querySelector('.wrapper__list');
console.log(cardList)
const API_KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';
let dataBase = null;

function getCardsList() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:${favorites}&api-key=${API_KEY}`
//   fetch(URL)
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?` + new URLSearchParams({
        fq: `_id:${favorites}`,
        'api-key': `${API_KEY}`,
    }))
    .then(response => response.json())
    .then(({ results }) => {
      console.log(results);
      dataBase = results;
      let html = '';
      if (results) {
        results.map(data => {
            const subTitle = data.abstract.slice(0, 100) + `...`;
            const title = data.headline.main.slice(0, 60) + `...`;
            const date = data.pub_date.toString().slice(0, 10).replace(`-`, '/').replace(`-`, '/');
      
            let imageAddress;
            let imageStartAddress;
      
            if (data.multimedia.length === 0) {
              imageAddress =
                'https://st.depositphotos.com/1000558/53737/v/1600/depositphotos_537370102-stock-illustration-image-photo-sign-symbol-template.jpg';
            } else if (data.multimedia.length > 0) {
              imageStartAddress = 'https://static01.nyt.com/';
              imageAddress = imageStartAddress + data.multimedia[0].url;
            }
            html += `<li class = "card-item" data-id = "${data.uri}">
          <div class="card-wrapper">
            <div class="card-thumb">
              <img class="card-image" src = "${imageAddress}" alt = "${data.byline}">
              <p class="card-news-category">${data.section_name}</p>
      
              <p class="card-text-read">Already read
              <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
              <button class="favorite-button" type="button" data-action="favorite-button">Add to favorite</button>
      
            </div>
            <h3 class="card-news-title">${data.headline.main}</h3>
            <p class="card-news-description">${subTitle}</p>
            <div class="card-info-container">
              <p class="card-datetime">${date}</p>
              <a class="card-link" href="${data.web_url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
            </div>
          </div>
      </li>`;
        });
        cardList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't find any news!";
        // cardList.classList.add('notFound');
      }
      cardList.innerHTML = html;
      setFavoritesOnLoad();
    });
}

getCardsList();

function setFavoritesOnLoad() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites);
  
    favorites.forEach(id => {
      const cardItem = document.querySelector(`[data-id="${id}"]`);
      const favoriteBtn = cardItem.querySelector("[data-action='favorite-button']");
  
      favoriteBtn.classList.add('removeFavorite-btn');
      favoriteBtn.textContent = 'Remove from favorite';
    });
  }

  if(cardList) {
      cardList.addEventListener('click', addToFavorite);
      cardList.addEventListener('click', addToReadyRead);
  }

const LOCAL_STORAGE_KEY = 'read_key'; //ключ для локалстореджа
//Проверка наличия данных в локалсторедж и запись новых данных
function setItemToLocalStorage(item) {
  const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  //Конвертация формата даты в вид 00/00/00
  const currentData = new Date();
  const currentDataString = `${currentData.getDate()}/${
    currentData.getMonth() + 1
  }/${currentData.getFullYear()}`;

  if (!dataLocalStorage) {
    const newData = [{ data: currentDataString, items: [item] }];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    return;
  }

  const dataArr = JSON.parse(dataLocalStorage);

  let goodDataFlag = true; //флаг проверки записи в локалсторедж

  const newDataArr = dataArr.map(elItem => {
    if (elItem.data === currentDataString) {
      goodDataFlag = false;
      elItem.items.push(item);
      return elItem;
    }
    return elItem;
  });

  if (goodDataFlag) {
    newDataArr.push({ data: currentDataString, items: [item] });
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDataArr));
}

setItemToLocalStorage({});

const createCardItem = data => {
  return `<summary>${data}</summary>`;
  const macCard = ({ id, text }) => {
    return `<div>
    <p>${id}</p>
    <p>${text}</p>
    </div>
    `;
  };
};

const FAV_LOCAL_STORAGE_KEY = 'fav_key'; //ключ для локалстореджа
//Проверка наличия данных в локалсторедж и запись новых данных
function setItemToLocalStorageFav(item) {
  const dataLocalStorage = localStorage.getItem(FAV_LOCAL_STORAGE_KEY);
  //Конвертация формата даты в вид 00/00/00
  const currentData = new Date();
  const currentDataString = `${currentData.getDate()}/${
    currentData.getMonth() + 1
  }/${currentData.getFullYear()}`; // *******

  if (!dataLocalStorage) {
    const newData = [{ data: currentDataString, items: [item] }];
    localStorage.setItem(FAV_LOCAL_STORAGE_KEY, JSON.stringify(newData));
    return;
  }

  const dataArr = JSON.parse(dataLocalStorage);

  let goodDataFlag = true; //флаг проверки записи в локалсторедж

  const newDataArr = dataArr.map(elItem => {
    console.dir(elItem, 'ffsdafsa');
    if (elItem.data === currentDataString) {
      goodDataFlag = false;
      elItem.items.push(item);
      return elItem;
    }
    return elItem;
  });

  if (goodDataFlag) {
    newDataArr.push({ data: currentDataString, items: [item] });
  }

  localStorage.setItem(FAV_LOCAL_STORAGE_KEY, JSON.stringify(newDataArr));
}

setItemToLocalStorageFav();

function addToReadyRead(e) {
  if (e.target.className === 'card-link') {
    let cardItem =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    const cardObj = dataBase.find(el => el.uri === cardItem);
    setItemToLocalStorage(cardObj);
  }
}

function addToFavorite(e) {
  if (e.target.className === 'favourite-button') {
    let cardItemFav =
      e.target.parentElement.parentElement.parentElement.dataset.id;
    const crdObjFav = dataBase.find(el => el.uri === cardItemFav);
    setItemToLocalStorageFav(crdObjFav);
  }
}