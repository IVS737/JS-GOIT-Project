import createEmptyMarkup from '../renderEmptyMarkup';

const cardList = document.querySelector('.wrapper__list');
const favoritesList = document.querySelector('.favorites__list');

function createGetCardList() {
  if (window.location.pathname !== '/favoritePage.html') return;
  cardList.style.display = 'block';
  const array = localStorage.getItem('favorites') && JSON.parse(localStorage.getItem('favorites'));
  if (!array || array.length === 0) {
    createEmptyMarkup();
    return;
  }
  const news = array
    .map(
      (element) =>
        `<li class = "card-item" data-id = "${element.id}">

   <div class="card-wrapper">
    <div class="card-thumb">
        <img class="card-image" src = "${element.image}" alt = "">
        <p class="card-news-category">${element.category}</p>

       <p class="card-text-read">Already read
         <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
        <button class="removefavorite-button" type="button" data-action="removefavorite-button">Removed from favorites</button>

      </div>
      <h3 class="card-news-title">${element.title}</h3>
      <p class="card-news-description">${element.description}</p>
      <div class="card-info-container">
        <p class="card-datetime">${element.date}</p>
        <a class="card-link" href="${element.link}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
      </div>
    </div>
 </li>`,
    )
    .join('');

  favoritesList.innerHTML = news;
}
createGetCardList();
cardList.addEventListener('click', addToFavorite);

function addToFavorite(event) {
  if (event.target.nodeName !== 'BUTTON') return;

  let card = event.target.parentElement.parentElement.parentElement;
  const cardObj = {
    id: card.dataset.id,
    image: card.querySelector('.card-image').src,
    category: card.querySelector('.card-news-category').textContent,
    title: card.querySelector('.card-news-title').textContent,
    description: card.querySelector('.card-news-description').textContent,
    date: card.querySelector('.card-datetime').textContent,
    link: card.querySelector('.card-link').href,
  };

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const idFavorites = favorites.map((el) => el.id);
  if (idFavorites.includes(cardObj.id) || event.target.classList.contains('removefavorite-button')) {
    removeFromFavorites(event, cardObj);
    return;
  }

  if (!event.target.classList.contains('removefavorite-button')) {
    favorites.push(cardObj);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    event.target.textContent = 'Remove from favorites';
    event.target.classList.toggle('removefavorite-button');
    event.target.classList.toggle('favourite-button');
  }
}
function removeFromFavorites(event, { id }) {
  if (window.location.pathname === '/index.html') {
    event.target.textContent = 'Add to favourite';
    event.target.classList.toggle('removefavorite-button');
    event.target.classList.toggle('favourite-button');
  }
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const indexArray = favorites.map((el) => el.id);
  const index = indexArray.indexOf(id);
  favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  createGetCardList();
}
