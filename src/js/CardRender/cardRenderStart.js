import imageValidation from '../../js/utils/imageValidation';

export default function MakeStartMarkup(array) {
  if (window.location.pathname !== '/index.html') return;
  const newsList = document.querySelector('.wrapper__list');
  const favoritesArray = localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites'));

  const arrayOfId = favoritesArray && favoritesArray.length !== 0 && favoritesArray.map((card) => card.id);

  const markUp = array
    .map((data) => {
      const subTitle = data.abstract.slice(0, 100) + `...`;
      const title = data.title.slice(0, 60) + `...`;
      const date = data.published_date.toString().slice(0, 10).replace(`-`, '/').replace(`-`, '/');

      const btnValue = arrayOfId && arrayOfId.includes(data.uri);

      let imageAddress = imageValidation(data);
      let btnText = btnValue ? 'Remove from favorites' : 'Add to favourite';
      let btnClass = btnValue ? 'removefavorite-button' : 'favourite-button';
      return `<li class = "card-item" data-id = "${data.uri}">
    <div class="card-wrapper">
      <div class="card-thumb">
        <img class="card-image" src = "${imageAddress}" alt = "${data.byline}">
        <p class="card-news-category">${data.section}</p>

        <p class="card-text-read">Already read
        <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
        <button id="${data.uri}" class="${btnClass}" type="button" data-action="favourite-button" >${btnText}</button>
      </div>
      <h3 class="card-news-title">${title}</h3>
      <p class="card-news-description">${subTitle}</p>
      <div class="card-info-container">

        <p class="card-datetime">${date}</p>
        <a class="card-link" href="${data.url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>

      </div>
    </div>
</li>`;
    })
    .join('');

  newsList.innerHTML = markUp;
}
