
import imagesDesc from '../images/notfoundDesc.png';
import imagesTab from '../images/notfoundTab.png';

import imagesMob from '../images/notfoundMob.png';
const refs = {

    form: document.querySelector(".header-search-form"),
    input: document.querySelector(".header-search-input"),
    submitButton: document.querySelector('.header-button-makesearch'),
    openInputButton: document.querySelector('.header-button-opensearch'),
  withoutNewsContainer: document.querySelector('.container__error'),
    newsList: document.querySelector('.wrapper__list'),
    weatherContainer: document.querySelector('.news__weather')
}
const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList, weatherContainer } = refs;


export default function createEmptyMarkup() {
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
  weatherContainer.innerHTML = "";
  withoutNewsContainer.innerHTML = emptyMarkup;
}