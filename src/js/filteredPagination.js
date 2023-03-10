import axios from 'axios';
import RenderCategory from './CategoryList/renderCategoryList';
const render = new RenderCategory();

const paginator = document.getElementById('paginator');

let currentPage = 1;
let totalPages = 4;
let offsetValue  = 0;

export default function changeFilterName(name) {
  currentPage = 1;
  filterNameByDefaul = name;
  offsetValue = 0;
  searchByFilter();
}
async function searchByFilter() {
  const newsBox = document.querySelector('.news');
  const paginationBox = document.getElementById('paginator');
  const newsError = document.querySelector('.container__error')
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/news/v3/content/all/${filterNameByDefaul}.json?limit=8&offset=${offsetValue}&api-key=kAFi92vRzv66C7DQ6coSA3C5NLbSIILk`,
    );
    newsError.style.display = 'none';
    newsBox.style.display === 'none' && (newsBox.style.display = 'block');
    paginationBox.style.display === 'none'&& (paginationBox.style.display = 'flex');
       
         const articles = response.data.results ;// 8 articles
         

          
       
         newsListRender(articles);
       
         displayPagination();
        
  } catch (error) {
    console.log(error);
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
    
    const date = result.published_date.toString().slice(0, 10).replace(`-`, '/').replace(`-`, '/');
    const subTitle = result.abstract.slice(0, 100) + `...`;
    const title = result.title.slice(0, 60) + `...`;

    return {
      title: title,
      image: imageValidation(result),
      description: subTitle,
      date: new Date(date),
      url: result.web_url,
      section: result.section,
      uri: result.uri,
    };
  });
  render.makeMarkup(articles);
}

function imageValidation(data) {
  if (!data.multimedia || data.multimedia.length === 0 || data.multimedia.length === 2) {
    return 'https://st.depositphotos.com/1000558/53737/v/1600/depositphotos_537370102-stock-illustration-image-photo-sign-symbol-template.jpg';
  } else if (data.multimedia.length > 0) {
    return `${data.multimedia[2].url}`;
  }
  
}

function displayPagination() {
  paginator.innerHTML = '';
  const prevButton = document.createElement('button');
  const paginatorBtnTitlePrew = document.createElement('span');

  prevButton.classList.add('paginator__button', 'paginator__button-nav');
  paginatorBtnTitlePrew.classList.add('paginator__button-title-prew');
  paginatorBtnTitlePrew.innerText = 'Prev';

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
        offsetValue = 0;
        searchByFilter();
      });

      paginator.appendChild(firstPageButton);


    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.innerText = i;
      pageButton.classList.add('paginator__button');

      if (i === currentPage) {
        pageButton.classList.add('isSelected');
        pageButton.setAttribute('disabled', true);
      } else {
        pageButton.addEventListener('click', () => {
          currentPage = i;
          offsetValue = (currentPage - 1) * 10;
          window.scrollTo(0, 0);
          searchByFilter();
        });
      }

      paginator.appendChild(pageButton);
    }

  if (endPage < totalPages) {
   

    const lastPageButton = document.createElement('button');

    lastPageButton.innerText = totalPages;

    lastPageButton.classList.add('paginator__button');
    lastPageButton.addEventListener('click', () => {
      currentPage = totalPages;
      window.scrollTo(0, 0);
      searchByFilter();
    });
    paginator.appendChild(lastPageButton);
      paginator.appendChild(nextButton)}
  //  else if (currentPage !== totalPages) {
  //   const lastPageButton = document.createElement('button');
  //   lastPageButton.innerText = totalPages;
  //   lastPageButton.classList.add('paginator__button');
  //   paginator.appendChild(lastPageButton);
  //   paginator.appendChild(nextButton);
  // }

  paginator.appendChild(nextButton);

  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage --;
      offsetValue -= 10;
      searchByFilter();
      window.scrollTo(0, 0);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      currentPage ++;
      offsetValue += 10;
      searchByFilter();
      window.scrollTo(0, 0);
    }
  }

}}
