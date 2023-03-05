export const getFromStorage = key => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.error(error);
    }
};

function localStorageFunction(newsData) {
    const newsObject = JSON.stringify(newsData);
    const isFavoritePage = location.pathname.includes('favoritePage');
    const cartItem = document.querySelector(`[data-id="${newsData.data}"]`);
  
    const watchBtn = document.querySelector('[data-action="favorite-button"]');
  
    watchBtn.addEventListener('click', addFavorite);
  
    if (localStorage.getItem('news').includes(newsObject) && localStorage.getItem('news').length > 2) {
      watchBtn.classList.add('button--accent-btn');
      watchBtn.textContent = 'Remove to favorite';
    }
  
    function addFavorite() {
      if (newsData) {
        let news = JSON.parse(localStorage.getItem('news')) || [];

        if (news.find(e => e.data === newsData.data)) {

          watchBtn.classList.remove('button--accent-btn');
          watchBtn.textContent = 'Add to favorite';
          news = news.filter(e => e.data !== newsData.data);

          if (isFavoritePage && cartItem && true) {
            cartItem.remove();
          }

        } else {
          watchBtn.classList.add('button--accent-btn');
          watchBtn.textContent = 'Remove to favorite';
          news.push(newsData);
        }
        localStorage.setItem('news', JSON.stringify(news));
      }
    }
  }

  export { localStorageFunction };
