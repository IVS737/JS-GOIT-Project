const refs = {
  form: document.querySelector('.header-search-form'),
  input: document.querySelector('.header-search-input'),
  submitButton: document.querySelector('.header-button-makesearch'),
  openInputButton: document.querySelector('.header-button-opensearch'),
  withoutNewsContainer: document.querySelector('.container__error'),
  newsList: document.querySelector('.wrapper__list'),
};

const { form, input, submitButton, openInputButton, withoutNewsContainer, newsList } = refs;

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
                    srcset="
                      ../images/notfoundDesc.png    1x,
                      ../images/notfoundDesc@2x.png 2x
                    "
                  />

                  <source
                    media="(min-width:768px)"
                    srcset="
                      ../images/notfoundTab.png    1x,
                      ../images/notfoundTab@2x.png 2x
                    "
                  />

                  <img
                    srcset="
                      ../images/notfoundMob.png    1x,
                      ../images/notfoundMob@2x.jpg 2x
                    "
                    alt="There aren't news"
                    src="./images/notfoundMob.png"
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
      return `<li class = "card-item" data-id = "${data.title}">
    <div class="card-wrapper">
      <div class="card-thumb">
        <img class="card-image" src = "${imageAddress}" alt = "${data.byline}">
        <p class="card-news-category">${data.section_name}</p>
        <p class="card-text-read">Already read</p>
        <button class="favorite-button" type="button" data-action="favorite-button">Add to favorite
        <svg width ="16" height="16"><use href="../images/symbol-defs.svg#icon-heart"></use><svg></button>
      </div>
      <h3 class="card-news-title">${data.headline.main}</h3>
      <p class="card-news-description">${subTitle}</p>
      <div class="card-info-container">
        <p class="card-datetime">${date}</p>
        <a class="card-link" href="${data.web_url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
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
