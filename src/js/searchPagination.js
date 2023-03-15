import axios from 'axios';
import { format } from 'date-fns';
import RenderCategory from './CategoryList/renderCategoryList';
const render = new RenderCategory();
const apiKey = 'kAFi92vRzv66C7DQ6coSA3C5NLbSIILk';
const searchForm = document.querySelector('.header-search-form');
const searchInput = document.querySelector('.header-search-input');
const paginator = document.getElementById('paginator');
const newsList = document.querySelector('.wrapper__list');

let currentPage = 0;
let totalPages = 0;

let searchName = '';

function setName(name) {
  currentPage = 1;
  searchName = name;
  searchArticles()
}

async function searchArticles() {
  const newsBox = document.querySelector('.news');
  const paginationBox = document.getElementById('paginator');
  const newsError = document.querySelector('.container__error')
  
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchInput.value}&api-key=${apiKey}&page=${
        currentPage
      }`,
    );
    
    if (response.data.response.docs.length === 0) {
      newsError.style.display === 'none' && (newsError.style.display = 'block');
      paginationBox.style.display = 'none';
      newsBox.style.display = 'none';
      render.emptyMarkup();
      return;
    }
    newsError.style.display = 'none';
    newsBox.style.display === 'none' && (newsBox.style.display = 'block');
    paginationBox.style.display === 'none'&& (paginationBox.style.display = 'flex');
        const articles = response.data.response.docs.slice(0, 8); // 8 articles

      totalPages = Math.ceil(response.data.response.meta.hits / 1000);
      totalPages = totalPages > 200 ? 200 : totalPages;

        makeMarkup(articles); 
        displayPagination();
  } catch (error) {
    console.log(error);
    newsError.style.display === 'none' && (newsError.style.display = 'block');
    paginationBox.style.display = 'none';
    newsBox.style.display = 'none';
    render.emptyMarkup();
    return;
  }
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

      return `<li class = "card-item" data-id = "${data.uri}">

    <div class="card-wrapper">
      <div class="card-thumb">
        <img class="card-image" src = "${imageAddress}" alt = "${data.byline}">
        <p class="card-news-category">${data.section_name}</p>

        <p class="card-text-read">Already read
        <svg width="18" height="18" class="check-icon"><use href="../images/symbol-defs.svg#icon-check"</svg></p>
        <button class="favourite-button" type="button" data-action="favourite-button">Add to favorite</button>

      </div>
      <h3 class="card-news-title">${title}</h3>
      <p class="card-news-description">${subTitle}</p>
      <div class="card-info-container">
        <p class="card-datetime">${format(new Date(date), 'dd/MM/yyyy')}</p>
        <a class="card-link" href="${data.web_url}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
      </div>
    </div>
</li>`;
    })
    .join('');

  newsList.innerHTML = markUp;
}

function displayPagination() {
  paginator.innerHTML = '';
  const prevButton = document.createElement('button');
  const paginatorBtnTitlePrew = document.createElement('span');

  prevButton.classList.add('paginator__button', 'paginator__button-nav');
  paginatorBtnTitlePrew.classList.add('paginator__button-title-prew');
  paginatorBtnTitlePrew.innerText = 'Prew';
  if (currentPage <= 1) {
    prevButton.classList.add('isDisabled');
    prevButton.setAttribute('disabled', true);
  }

  prevButton.prepend(paginatorBtnTitlePrew);

  prevButton.addEventListener('click', () => {
    goToPreviousPage();
  });

  const nextButton = document.createElement('button');
  const paginatorBtnTitleNext = document.createElement('span');
  paginatorBtnTitleNext.classList.add('paginator__button-title-next');
  paginatorBtnTitleNext.innerText = 'Next';
  nextButton.classList.add('paginator__button', 'paginator__button-nav');

  if (currentPage >= totalPages) {
    nextButton.classList.add('isDisabled');
    nextButton.setAttribute('disabled', true);
  }


  nextButton.append(paginatorBtnTitleNext);

  nextButton.addEventListener('click', () => {
    goToNextPage();
  });

  paginator.appendChild(prevButton);

  let startPage, endPage;
  let maxVisibleButtons = 2;
  if (window.innerWidth >= 425) {
    maxVisibleButtons = 3;
  }
  if (totalPages <= maxVisibleButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const halfVisibleButtons = Math.floor((maxVisibleButtons - 1) / 2);
    if (currentPage <= halfVisibleButtons + 1) {
      startPage = 1;
      endPage = maxVisibleButtons;
    } else if (currentPage >= totalPages - halfVisibleButtons) {
      endPage = totalPages;
      startPage = endPage - (maxVisibleButtons - 1);
    } else {
      startPage = currentPage - halfVisibleButtons;
      endPage = currentPage + halfVisibleButtons;
    }
  }

  if (startPage > 1) {
    const firstPageButton = document.createElement('button');
    firstPageButton.innerText = 1;
    firstPageButton.classList.add('paginator__button');
    firstPageButton.addEventListener('click', () => {
      currentPage = 0;
      window.scrollTo(0, 0);
      searchArticles();
    });

    paginator.appendChild(firstPageButton);

    const dotsButton = document.createElement('button');
    dotsButton.classList.add('paginator__button', 'paginator__button--notbordered');

    dotsButton.innerText = '...';
    dotsButton.disabled = true;
    paginator.appendChild(dotsButton);
  }

  for (let i = startPage; i <= endPage; i++) {

    let numButtons = 0;
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.classList.add('paginator__button');

    pageButton.addEventListener('click', () => {
      currentPage = i;
      searchArticles();

      window.scrollTo(0, 0);
    });
    paginator.appendChild(pageButton);
    numButtons++;
    if (i === currentPage) {
      pageButton.classList.add('isSelected');
    }
  }

  if (endPage < totalPages - 1) {
    const dotsButton = document.createElement('button');
    dotsButton.classList.add('paginator__button', 'paginator__button--notbordered');

    dotsButton.innerText = '...';
    dotsButton.disabled = true;
    paginator.appendChild(dotsButton);

    const lastPageButton = document.createElement('button');

    lastPageButton.innerText = totalPages;

    lastPageButton.classList.add('paginator__button');
    lastPageButton.addEventListener('click', () => {
      currentPage = totalPages > 200 ? 200 : totalPages;
      window.scrollTo(0, 0);
      searchArticles();
    });
    paginator.appendChild(lastPageButton);
    paginator.appendChild(nextButton);
  } else if (currentPage !== totalPages) {
    const lastPageButton = document.createElement('button');

    lastPageButton.innerText = totalPages;

    lastPageButton.classList.add('paginator__button');
    paginator.appendChild(lastPageButton);
    paginator.appendChild(nextButton);
  }

  paginator.appendChild(nextButton);

  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      searchArticles();

      window.scrollTo(0, 0);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      searchArticles();

      window.scrollTo(0, 0);
    }
  }
}

//mob menu

const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.burger-btn-open');

const toggleMenu = () => {
  const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');
};

//

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  setName(event.currentTarget.elements.newsField.value.trim());
  searchArticles();

  window.scrollTo(0, 0);

  if (mobileMenu.classList.contains('is-open')) {
    toggleMenu();
  }
});
