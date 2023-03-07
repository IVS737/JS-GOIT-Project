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
  readMoreLink: document.querySelector('.card-link'),
};

const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList, readMoreLink} = refs;

const KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';
form.addEventListener('submit', onFormSubmit);
openInputButton.addEventListener('click', onOpenInputButtonClick);


let value = '';

function onFormSubmit(event) {
  value = event.currentTarget.elements.newsField.value.trim();
  event.preventDefault();

  fetchNews(value)
    .then((data) => {
      if (data.response.docs.length === 0) {
        form.reset();
        newsList.innerHTML = '';
        return createEmptyMarkup();
      }
      makeMarkup(data.response.docs);
      return data.response.docs;
    })
    .catch(onError);
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
  withoutNewsContainer.innerHTML = emptyMarkup;
}

function makeMarkup(array) {
  const markUp = array
    .map((data) => {
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
      console.log(data);
      return `<li class = "card-item" data-id = "${data._id}">

    <div class="card-wrapper">
      <div class="card-thumb">
        <img class="card-image" src = "${imageAddress}" alt = "${data.byline}">
        <p class="card-news-category">${data.section_name}</p>

        <p class="card-text-read">Already read
        <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
        <button class="favourite-button" type="button" data-action="favourite-button">Add to favorite</button>

      </div>
      <h3 class="card-news-title">${data.headline.main}</h3>
      <p class="card-news-description">${subTitle}</p>
      <div class="card-info-container">
        <p class="card-datetime">${date}</p>
        <a class="card-link" href="${data.web_url}" target="_blank" rel="noopener noreferrer nofollow" data-action="link"'>Read more</a>
      </div>   
    </div>
</li>`;
    })
    .join('');

  newsList.innerHTML = markUp;
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
newsList.addEventListener('click', addToReed);

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

      event.target.textContent = 'Remove from favourites';
      event.target.classList.add('removefavourite-button');
    }
  }
}

const LOCAL_STORAGE_KEY = 'read_key';

function addToReed(event) {
  const currentLink = event.target;
  if (currentLink.className === 'card-link') {

    const currentCard = currentLink.parentElement.parentElement.parentElement;
    currentCard.classList.add("read");
    setItemToLocalStorage(currentCard.dataset.id);
  }
}

function setItemToLocalStorage(item) {
  const dataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  //Конвертація формату дати 00/00/00
  const currentData = new Date();
  const currentDataString = `${currentData.getDate()}/${
    currentData.getMonth() + 1
  }/${currentData.getFullYear()}`; // *******

  if (!dataLocalStorage) {
    const newData = [{ data: currentDataString, items: [item] }];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    return;
  }

  const dataArr = JSON.parse(dataLocalStorage);

  let goodDataFlag = true; //прапорець перевірки запису в локалсторидж

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

