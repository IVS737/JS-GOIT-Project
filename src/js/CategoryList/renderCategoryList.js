import {format } from 'date-fns';
import imagesDesc from '../../images/notfoundDesc.png';
import imagesTab from '../../images/notfoundTab.png';
import imagesMob from '../../images/notfoundMob.png';

export default class RenderCategory {
   makeMarkup(array) {
    const newsList = document.querySelector('.wrapper__list')
    const markUp = array
      .map((data) => {
        const { image, section, title, description, date, url, id } = data;
        return `<li class = "card-item" data-id = "${id}">
      <div class="card-wrapper">
        <div class="card-thumb">
          <img class="card-image" src = "${image}" alt = "${description}">
          <p class="card-news-category">${section}</p>
  
          <p class="card-text-read">Already read
          <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
          <button class="favourite-button" type="button" data-action="favourite-button">Add to favorite</button>
  
        </div>
        <h3 class="card-news-title">${title}</h3>
        <p class="card-news-description">${description}</p>
        <div class="card-info-container">
          <p class="card-datetime">${format(date, 'dd/MM/yyyy')}</p>
          <a class="card-link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
        </div>
      </div>
  </li>`;
      })
      .join('');
  
    newsList.innerHTML = markUp;
  }
emptyMarkup() {
  const clearWrap = document.querySelector('.wrapper__list')
  const newsList = document.querySelector('.container__error')
  clearWrap.innerHTML = '';

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
      newsList.innerHTML = emptyMarkup;
  }
}
