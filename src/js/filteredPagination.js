import axios from 'axios';

const searchForm = document.querySelector('.header-search-form');
const paginator = document.getElementById('paginator');

let currentPage = 1;
let totalPages = 0;
let filterNameByDefaul = 'sports';

searchByFilter(filterNameByDefaul); /// Cюди передати значення фільтру.

async function searchByFilter() {
  const response = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?limit=10&fq=news_desk:(${filterNameByDefaul})&api-key=kAFi92vRzv66C7DQ6coSA3C5NLbSIILk&page=${
      currentPage - 1
    }`,
  );
  const articles = response.data.response.docs.slice(0, 8); // 8 articles

  totalPages = Math.ceil(response.data.response.meta.hits / 1000);
  // foo(articles); //? Тут рендеремо розмітку
  displayPagination();
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
      currentPage = 1;
      window.scrollTo(0, 0);
      searchByFilter();
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
      searchByFilter();

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
      currentPage = totalPages;
      window.scrollTo(0, 0);
      searchByFilter();
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
      searchByFilter();
      window.scrollTo(0, 0);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      currentPage++;
      searchByFilter();
      window.scrollTo(0, 0);
    }
  }

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    currentPage = 1;
    searchByFilter();
    window.scrollTo(0, 0);
  });
}
