import Notiflix from 'notiflix';

// const dateListEl = document.querySelector('.date-list');

// const undefinedReadeMore = document.querySelector('.underfined');

// function arrLocal() {
//   const local = JSON.parse(localStorage.getItem('read_key'));
//   if (local === null) {
//     undefinedReadeMore.classList.remove('underfined-hidden');
//     return;
//   }
//   return local;
// }

// // function fetchNews(value) {
// //   const local = JSON.parse(localStorage.getItem('read_key'));
// //   return fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${value}&api-key=${KEY}`).then(
// //     (response) => {
// //       if (!response.ok) {
// //         throw new Error(response.status);
// //       }
// //       return response.json();
// //     },
// //   );
// // }

// function sortDateReadMore(array = [], callback) {
//   const groupByDate = {};
//   for (const objectEl of array) {
//     const key = callback(objectEl);
//     if (groupByDate[key]) {
//       groupByDate[key].push(objectEl);
//     } else {
//       groupByDate[key] = [objectEl];
//     }
//   }
//   return groupByDate;
// }

// function makeMarkupLoadMore(array) {
//   const markupReadMore = array
//     .map((data) => {
//       return `<li class="list-news__item">
//               <article class="item-news__article">
//                   <div class="item-news__wrapper-img">
//                       <img class="item-news__img"
//                           src="${data.img}"
//                           alt="">
//                       <p class="item-news__category">${data.category}</p>
//                       <button type="button" class="item-news__add-to-favorite">
//                       <span class="item-news__add-to-favorite-btn">Add to favorite
//                          <svg class="item-news__block-icon active-news-icon"
//                                 width="16"
//                                 height="16"
//                                 viewBox="0 0 37 32"
//                                 >
//                             <path style="stroke: var(--color1, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
//                             </svg></span>
//                             <span class="item-news__remove-to-favorite-btn ">Remove from favorite
//                             <svg class="item-news__block-icon active-news-icon"
//                             width="16"
//                             height="16"
//                             viewBox="0 0 37 32"
//                             >
//                             <path style="stroke: var(--color1, #4440F7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
//                             </svg></span>
//                       </button>
//                   </div>
//                   <div class="item-news__wrapper-text">
//                   <h2 class="item-news__title">
//                       ${data.title}
//                   </h2>
//                   <p class="item-news__description">
//                       ${data.description}</p>
//                   </div>
//                   <div class="item-news__info">
//                       <span class="item-news__info-date">
//                           ${data.date}
//                       </span>
//                       <a target="_blank" class="item-news__info-link" href="${data.link}">Read more</a>
//                       <p class='is-hidden'>${data.uri}</p>
//                   </div>
//               </article>
//           </li>`;
//     })
//     .join('');
//   return markupReadMore;
// }

// const sortDate = sortDateReadMore(arrLocal(), (objectEl) => objectEl.data);

// markupDateRead(sortDate);

// function markupDateRead(objectEl) {
//   const markupBlockDate = Object.keys(objectEl)
//     .map((id) => {
//       return `<li class="date-list__item">
//   <button class="date-list__btn"><span class="date-list__btn-text">${id}</span><span class="date-list__btn-block">
//   <svg class="date-list__btn-icon" width="14" height="9" aria-hidden="true" style="position: absolute;>
// <symbol id="icon-Vector-2-1" viewBox="0 0 50 32">
// <path d="M5.867 0l-5.867 6.080 24.889 25.92 24.889-25.92-5.831-6.080-19.058 19.769-19.058-19.769z"></path>
// </symbol>
// </svg></span>
//   </button>
//   <ul class="list-news is-hidden">${makeMarkupLoadMore(objectEl[id])}</ul>
// </li>`;
//     })
//     .join('');
//   createMarkupLoadMore(markupBlockDate);
// }

// dateListEl.addEventListener('click', (event) => {
//   const btn = event.target.closest(`.date-list__btn`);
//   if (!btn) return;
//   const iconDate = btn.querySelector('.date-list__btn-icon');

//   if (!btn.nextElementSibling.classList.contains('is-hidden')) {
//     btn.nextElementSibling.classList.add('is-hidden');
//     iconDate.classList.remove('turn');
//     return;
//   }

//   function isHiddenItem(arr) {
//     arr.filter((list) => {
//       list.classList.contains('is-hidden');
//     });
//   }

//   if (!isHiddenItem(Array.from(document.querySelectorAll('.wrapper__list')))) {
//     const item = document.querySelectorAll('.wrapper__list');
//     item.forEach((elem) => {
//       elem.classList.add('is-hidden');
//       iconDate.classList.toggle('turn');
//     });
//   }

//   btn.nextElementSibling.classList.toggle('is-hidden');
//   iconDate.classList.toggle('turn');

//   return;
// });

// function createMarkupLoadMore(evt) {
//   dateListEl.innerHTML = evt;
// }

console.log('hi');

import { format } from 'date-fns';

import imagesDesc from '../images/notfoundDesc.png';
import imagesTab from '../images/notfoundTab.png';
import imagesMob from '../images/notfoundMob.png';

import NewsServise from './newslist.js';
import createEmptyMarkup from './renderEmptyMarkup';
import Notiflix from 'notiflix';

const refs = {
  withoutNewsContainer: document.querySelector('.container__error'),
  newsList: document.querySelector('.wrapper__list'),
  list: document.querySelector('.list'),
  newsContainer: document.querySelector('.news'),
};

//  function createEmptyMarkup() {
//   const emptyMarkup = `<h2 class="withoutnews-title">We haven’t found news from <br> this category</h2><picture>               <source
//                 media="(min-width:1280px)"                srcset="${imagesDesc}"
//              />

// //                   <source
// //                     media="(min-width:768px)"
// //                     srcset="
// //                       ${imagesTab}
// //                     "
// //                   />

// //                   <img
// //                     srcset="
// //                       ${imagesMob}
// //                     "
// //                     alt="There aren't news"
// //                     src="${imagesMob}"
// //                     loading="lazy"
// //                     class="withoutnews-image"
// //                   />
// //                 </picture>`;

//   refs.withoutNewsContainer.innerHTML = emptyMarkup;
//  }

function createGetCardList() {
  const array = localStorage.getItem('readArticles');
  const parsedArray = JSON.parse(array);
  console.log(parsedArray);
  const news = parsedArray
    .map(
      (element) =>
        `<li class = "card-item" data-id = "${element.id}">

   <div class="card-wrapper">
    <div class="card-thumb">
        <img class="card-image" src = "${element.image}" alt = "">
        <p class="card-news-category">${element.category}</p>

       <p class="card-text-read" style="display: flex">Already read</p>
    <button class="favourite-button" type="button" data-action="favorite-button">Add to favorite</button>
      </div>
      <h3 class="card-news-title">${element.title}</h3>
      <p class="card-news-description">${element.description}</p>
      <div class="card-info-container">
        <p class="card-datetime">${element.cardDate}</p>
        <a class="card-link" href="${element.link}" target="_blank" rel="noopener noreferrer nofollow">Read more</a>
      </div>
    </div>
 </li>`,
    )
    .join('');

  refs.list.innerHTML = news;

  //   if (!parsedArray) {
  //       createEmptyMarkup()
  //       console.log('kjjk')
  //   }
  if (news.length === null) {
    Notiflix.Notify.info('You havn`t read anything');
  }
}

createGetCardList();
