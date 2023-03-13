import { format } from 'date-fns';

const refs = {
  form: document.querySelector('.header-search-form'),
  input: document.querySelector('.header-search-input'),
  submitButton: document.querySelector('.header-button-makesearch'),
  openInputButton: document.querySelector('.header-button-opensearch'),
  withoutNewsContainer: document.querySelector('.container__error'),
  newsList: document.querySelector('.wrapper__list'),
};
const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList } = refs;

export default function Makemarkup(array) {
  const markUp = array
    .map((data) => {
      const subTitle = data.abstract.slice(0, 100) + `...`;
      const title = data.headline.main.slice(0, 60) + `...`;
      const date = data.pub_date.toString().slice(0, 10).replace(`-`, '/').replace(`-`, '/');

      let imageAddress;
      let imageStartAddress;

      if (data.multimedia.length === 0) {
        imageAddress =
          'https://cdn.pixabay.com/photo/2019/04/29/16/11/new-4166472_960_720.png';
      } else if (data.multimedia.length > 0) {
        imageStartAddress = 'https://static01.nyt.com/';
        imageAddress = imageStartAddress + data.multimedia[0].url;
        if (imageAddress.includes('/wp-content')) {
          imageAddress =
            'https://cdn.pixabay.com/photo/2019/04/29/16/11/new-4166472_960_720.png';
        }
      }

      return `<li class = "card-item" data-id = "${data.uri}">

    <div class="card-wrapper">
      <div class="card-thumb">
        <img class="card-image" src = "${imageAddress}" alt = "${data.byline}">
        <p class="card-news-category">${data.section_name}</p>

        <p class="card-text-read">Already read
        <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
        <button id="${
          data.uri
        }"class="favourite-button" type="button" data-action="favourite-button">Add to favorite</button>

      </div>
      <h3 class="card-news-title">${title}</h3>
      <p class="card-news-description">${subTitle}</p>
      <div class="card-info-container">
        <p class="card-datetime">${format(new Date(date), 'dd/MM/yyyy')}</p>
        <a id="${data.uri}" class="card-link" href="${
        data.web_url
      }" data-action="link" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
      </div>
    </div>
</li>`;
    })
    .join('');

  newsList.innerHTML = markUp;
}
