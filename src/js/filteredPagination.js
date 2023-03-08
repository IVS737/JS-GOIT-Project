import axios from 'axios';

import RenderCategory from './CategoryList/renderCategoryList';
const render = new RenderCategory();

const searchForm = document.querySelector('.header-search-form');
const paginator = document.getElementById('paginator');

let currentPage = 1;
let totalPages = 0;
let filterNameByDefaul = 'sports';
searchByFilter();
export default function changeFilterName(name) {
  filterNameByDefaul = name;
  searchByFilter();
}
async function searchByFilter() {
  const newsBox = document.querySelector('.news');
  const paginationBox = document.getElementById('paginator');
  const newsError = document.querySelector('.container__error')
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?limit=8&fq=news_desk:(${filterNameByDefaul})&api-key=71s3mUNKm6z5TjxLJwNR66epaTNpAApf&page=${
        currentPage - 1
      }`,
    );
    // newsError.style.display = 'none';
    newsBox.style.display === 'none' && (newsBox.style.display = 'block');
    paginationBox.style.display === 'none'&& (paginationBox.style.display = 'block');

         const articles = response.data.response.docs.slice(0, 8); // 8 articles

         totalPages = Math.ceil(response.data.response.meta.hits / 10);
       
         newsListRender(articles);
       
         displayPagination();
        
  } catch (error) {
    newsError.style.display === 'none' && (newsError.style.display = 'block');
    paginationBox.style.display = 'none'
    newsBox.style.display = 'none';
    render.emptyMarkup();
    return;
  }



}

function newsListRender(newsArray) {
  const newsBox = document.querySelector('.news');

  const articles = newsArray.map((result) => {
    const date = result.pub_date.toString().slice(0, 10).replace(`-`, '/').replace(`-`, '/');
    const subTitle = result.abstract.slice(0, 100) + `...`;
    const title = result.headline.main.slice(0, 60) + `...`;

    return {
      title: title,
      image: imageValidation(result),
      description: subTitle,
      date: new Date(date),
      url: result.web_url,
      section: result.section_name,
      uri: result.uri,
    };
  });
  render.makeMarkup(articles);
}

function imageValidation(data) {
  if (!data.multimedia || data.multimedia.length === 0) {
    return 'https://st.depositphotos.com/1000558/53737/v/1600/depositphotos_537370102-stock-illustration-image-photo-sign-symbol-template.jpg';
  } else if (data.multimedia.length > 0) {
    return `http://www.nytimes.com/${data.multimedia[0].url}`;
  }
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
    dotsButton.classList.add('paginator__button--notbordered');
    dotsButton.setAttribute('disabled', true);
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
    dotsButton.classList.add('paginator__button--notbordered');

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

  // searchForm.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   currentPage = 1;
  //   searchByFilter();
  //   window.scrollTo(0, 0);
  // });
}
