let debounce = require('lodash.debounce');
import NewsApiService from './fetchNews';
const fetchNews = new NewsApiService();

import changeFilterName from '../filteredPagination';

export default (() => {
  if (window.location.pathname !== '/index.html') return;
  const categoryListWrap = document.getElementById('categoryList');
  const openCategoryListBtn = document.querySelector('.category__list__open__btn');
  const categoryListButtonWrap = document.querySelector('.category__list__btn__wrap');

  categoryListButtonWrap.addEventListener('click', showOtherCategoryList);
  openCategoryListBtn.addEventListener('click', showCategoryList);
  categoryListWrap.addEventListener('click', categoryHandler);

  window.addEventListener('resize', debounce(onResized, 500));
  document.addEventListener('click', (e) => {
    const isOpenCategoryList = !categoryListWrap.classList.contains('category__is-hidden');

    if (!categoryListWrap.contains(e.target) && isOpenCategoryList && e.target.nodeName !== 'BUTTON') {
      currentBtn(e);
      svgToggle(e);

      categoryListWrap.classList.add('category__is-hidden');
    }
  });

  async function foo() {
    const categoryList = await fetchNews.fetchCategory();
    fetchNews.categoryListArray = await categoryList.results;
    onResized();
  }
  foo();

  function showCategoryList(e) {
    openCategoryListBtn.classList.toggle('category__active-btn');
    categoryListWrap.classList.toggle('category__is-hidden');
    svgToggle(e);
  }
  function showOtherCategoryList(e) {
    if (e.target.name === 'showOthersList') {
      currentBtn(e);
      svgToggle(e);
      categoryListWrap.classList.toggle('category__is-hidden');
    } else if (e.target.nodeName === 'BUTTON') {
      !categoryListWrap.classList.contains('category__is-hidden') &&
        categoryListWrap.classList.add('category__is-hidden');

      svgToggle(e);
      e.target.disabled = true;
      const clickBtn = e.target;
      setTimeout(() => (clickBtn.disabled = false), 1500);

      currentBtn(e);

      changeFilterName(e.target.dataset.name);
    }
  }

  function currentBtn(e) {
    const currentActiveBtn = document.querySelector('.category__active-btn');
    if (e.target.nodeName === 'A' || !categoryListButtonWrap.contains(e.target)) {
      currentActiveBtn.classList.remove('category__active-btn');
      return;
    }
    if (window.innerWidth < 768 || !categoryListButtonWrap.contains(e.target)) {
      return;
    }
    if (currentActiveBtn === e.target && e.target.name === 'showOthersList') {
      currentActiveBtn.classList.remove('category__active-btn');
      return;
    }

    currentActiveBtn && currentActiveBtn.classList.remove('category__active-btn');
    e.target.classList.add('category__active-btn');
  }
  function svgToggle(e) {
    if (window.innerWidth < 768) {
      svgToggleMobile();
      return;
    }
    const currentSvg = document.querySelector('button[name=showOthersList]');

    if ((e.target.name !== 'showOthersList' && categoryListButtonWrap.contains(e.target)) || currentSvg !== e.target) {
      currentSvg.classList.add('category__list__btn__svg');
      currentSvg.classList.remove('category__list__btn__svg__up');
      return;
    }

    currentSvg.classList.toggle('category__list__btn__svg');
    currentSvg.classList.toggle('category__list__btn__svg__up');
  }
  function svgToggleMobile(e) {
    openCategoryListBtn.classList.toggle('category__list__btn__svg');
    openCategoryListBtn.classList.toggle('category__list__btn__svg__up');
  }
  async function categoryHandler(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
      return;
    }

    changeFilterName(e.target.dataset.name);

    currentBtn(e);
    svgToggle(e);

    categoryListWrap.classList.toggle('category__is-hidden');
  }
  function renderCategoryListButton(data, value = 0) {
    categoryListButtonWrap.innerHTML = '';
    categoryListWrap.innerHTML = '';
    //list category btn
    data.map(({ display_name, section }, index) => {
      if (index < value) {
        categoryListButtonWrap.insertAdjacentHTML(
          'beforeend',
          `<li><button class="category__list__btn" data-name=${section}>${display_name}</button></li>`,
        );
      } else {
        categoryListWrap.insertAdjacentHTML(
          'beforeend',
          `<li><a data-name="${section}" href="">${display_name}</a></li>`,
        );
      }
    });
    // Others category btn
    categoryListButtonWrap.insertAdjacentHTML(
      'beforeend',
      `<li><button  name="showOthersList" class="category__list__btn category__list__btn__svg" href="">Others
            </button>
            </li>`,
    );
  }
  function onResized() {
    if (window.innerWidth > 1279) {
      fetchNews.limitValue = 8;
      renderCategoryListButton(fetchNews.categoryListArray, 6);
    } else if (window.innerWidth > 767) {
      fetchNews.limitValue = 7;
      renderCategoryListButton(fetchNews.categoryListArray, 4);
    } else {
      fetchNews.limitValue = 4;
      renderCategoryListButton(fetchNews.categoryListArray);
    }
  }
})();
