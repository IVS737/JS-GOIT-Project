import imagesDesc from '../images/notfoundDesc.png';
import imagesTab from '../images/notfoundTab.png';
import imagesMob from '../images/notfoundMob.png';

export default function createEmptyMarkup() {
  if (window.location.pathname === '/favoritePage.html') {
    const clearWrap = document.querySelector('.wrapper__list');
    const newsList = document.querySelector('.container__error');

    clearWrap.innerHTML = '';

    const emptyMarkup = `<h2 class="withoutnews-title">No news added to <br> favorite</h2><picture>
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
    return;
  }
  // -------------------------------------------------------------------------------------------
  const clearWrap = document.querySelector('.wrapper__list');
  const newsList = document.querySelector('.container__error');
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
