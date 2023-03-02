const refs = {
    form: document.querySelector(".header-search-form"),
    input: document.querySelector(".header-search-input"),
    submitButton: document.querySelector('.header-button-makesearch'),
    openInputButton: document.querySelector('.header-button-opensearch'),
    // withoutNewsContainer: document.querySelector('.home-without-results-container'),
    newsContainer: document.querySelector('news-container'),
    newsList: document.querySelector('.news-list'),
}

const { form, input, submitButton, openInputButton} = refs;

const KEY = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';
form.addEventListener('submit', onFormSubmit);
openInputButton.addEventListener('click', onOpenInputButtonClick);



let value = "";

function onFormSubmit(event) {
    value = event.currentTarget.elements.newsField.value.trim();
    event.preventDefault();

    fetchNews(value)
        .then(data => {
            if (data.response.docs.length === 0) {
                form.reset();
                alert('даних немає');
                // withoutNewsContainer.innerHTML = "";
                return createEmptyMarkup();
            }
            makeMarkup(data.response.docs);
            return (data.response.docs);
        }
        ).catch(onError);
  
}

function fetchNews(value) {
  return fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function createEmptyMarkup() {
    const emptyMarkup = `<h2 class="withoutnews-title">We haven’t found news from <br> this category</h2><picture>
                  <source
                    media="(min-width:1280px)"
                    srcset="
                      ./images/notfoundDesc.png    1x,
                      ./images/notfoundDesc@2x.png 2x
                    "
                  />

                  <source
                    media="(min-width:768px)"
                    srcset="
                      ./images/notfoundTab.png    1x,
                      ./images/notfoundTab@2x.png 2x
                    "
                  />

                  <img
                    srcset="
                      ./images/notfoundMob.png    1x,
                      ./images/notfoundMob@2x.jpg 2x
                    "
                    alt="There aren't news"
                    src="./images/notfoundMob.png"
                    loading="lazy"
                    class="withoutnews-image"
                  />
                </picture>`
    // withoutNewsContainer.innerHTML = emptyMarkup;
    
}

function makeMarkup(array) {
    //СЮДИ ВСТАВЛЯТИ РОЗМІТКУ З ОДНІЄЮ КАРТКОЮ
    // const { abstract, pub_date } = array;
    // console.log(array);
    // const markUp = array.map(element => `<li><img><h2>${element.abstract}<h2><p></p>${element.pub_date}<p></li>`).join('');

    // newsList.innerHTML = markUp;
}


function onError(error) {
    createEmptyMarkup()
    console.log(error);
}

function onOpenInputButtonClick(event) {
    openInputButton.style.display = "none";
    form.style.display = "block";
}