const cardList = document.querySelector('.wrapper__list');

function createGetCardList() {
  const array = localStorage.getItem('favorites');
  const arparsed = JSON.parse(array);

  const news = arparsed.map((element) => 
`<li class = "card-item" data-id = "${element.cardEl}">

   <div class="card-wrapper">
    <div class="card-thumb">
        <img class="card-image" src = "${element.image}" alt = "">
        <p class="card-news-category">${element.category}</p>

       <p class="card-text-read">Already read
         <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
        <button class="removefavorite-button" type="button" data-action="removefavorite-button">Remove to favorite</button>

      </div>
      <h3 class="card-news-title">${element.title}</h3>
      <p class="card-news-description">${element.description}</p>
      <div class="card-info-container">
        <p class="card-datetime">${element.data}</p>
        <a class="card-link" href="${element.link}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
      </div>
    </div>
 </li>`)
  .join('');

  cardList.innerHTML = news;

}

createGetCardList();

cardList.addEventListener('click', removeToFavorite);

function removeToFavorite(event) {

  if (event.target.dataset.action === 'favorite-button') {
    let cardItem = event.target.parentElement.parentElement.parentElement.dataset.id;
    console.log(cardItem); // сardId
    const card = event.currentTarget.firstChild; //li
    const image = card.querySelector('.card-image'); //img
    const category = card.querySelector('.card-news-category'); //categoryconst
    const cardTitle = card.querySelector('.card-news-title'); //title
    const newsDescription = card.querySelector('.card-news-description'); //description
    const dateTime = card.querySelector('.card-datetime'); //date
    const newsLink = card.querySelector('.card-link'); //link
    // console.log(image);
    // console.log(card);
    // console.log(category);
    // console.log(cardTitle);
    // console.log(newsDescription);
    // console.log(dateTime);
    // console.log(newsLink);
    
    const oneCard = {
      cardEl: card.dataset.id,
      image: image.src,
      category: category.textContent,
      title: cardTitle.textContent,
      description: newsDescription.textContent,
      data: dateTime.textContent,
      link: newsLink.href,
    };
    console.log(oneCard);

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (event.target.classList.contains('removefavorite-button')) {

      const updatedFavorites = favorites.filter((element) => element.cardEl != cardItem);
      console.log(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
    } else {
      favorites.push(oneCard);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
  }
}
