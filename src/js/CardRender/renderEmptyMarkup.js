const refs = {

    form: document.querySelector(".header-search-form"),
    input: document.querySelector(".header-search-input"),
    submitButton: document.querySelector('.header-button-makesearch'),
    openInputButton: document.querySelector('.header-button-opensearch'),
  withoutNewsContainer: document.querySelector('.container__error'),
    newsList: document.querySelector('.wrapper__list'),
}
const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList } = refs;


export default function createEmptyMarkup() {
    const emptyMarkup = `<h2 class="withoutnews-title">We haven’t found news from <br> this category</h2><picture>
                    <source
                      media="(min-width:1280px)"
                      srcset="
  
                        images/notfoundDesc.png    1x,
                        images/notfoundDesc@2x.png 2x
  
                      "
                    />
  
                    <source
                      media="(min-width:768px)"
                      srcset="
                        images/notfoundTab.png    1x,
                        images/notfoundTab@2x.png 2x
  
                      "
                    />
  
                    <img
                      srcset="
  
                      images/notfoundMob.png    1x,
                      mages/notfoundMob@2x.jpg 2x
  
                      "
                      alt="There aren't news"
                      src="images/notfoundMob.png"
                      loading="lazy"
                      class="withoutnews-image"
                    />
                  </picture>`;
    withoutNewsContainer.innerHTML = emptyMarkup;
  }