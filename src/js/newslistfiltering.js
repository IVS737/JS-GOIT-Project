import NewsApiServise from './newslist';
import MakeStartMarkup from './CardRender/cardRenderStart';
import Makemarkup from './CardRender/cardRender';
import createEmptyMarkup from './CardRender/renderEmptyMarkup';
const NewsLoad = new NewsApiServise();
const refs = {
  form: document.querySelector('.header-search-form'),
  newsList: document.querySelector('.wrapper__list'),
};
const { form, newsList } = refs;

if ((NewsLoad.filter.length === 0) & (NewsLoad.news.length === 0) & (NewsLoad.date.length === 0)) {
  NewsLoad.getToplist().then((data) => {
    MakeStartMarkup(data.results);
    return data.results;
  });
} else if (NewsLoad.news.length > 0) {
  if (NewsLoad.filter.length > 0) {
    if (NewsLoad.date.length > 0) {
      //запит по пошукуб фільтру і даті
      NewsLoad.getFullNewsList()
        .then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }
          Makemarkup(data.response.docs);
          return data.response.docs;
        })
        .catch(onError);
    } else {
      //запит по пошуку і фільтру
      NewsLoad.getSerchFilterList()
        .then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }
          Makemarkup(data.response.docs);
          return data.response.docs;
        })
        .catch(onError);
    }
  } else if (NewsLoad.filter.length === 0) {
    if (NewsLoad.date.length > 0) {
      //запит по пошуку і даті
      NewsLoad.getSerchDateList()
        .then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }
          Makemarkup(data.response.docs);
          return data.response.docs;
        })
        .catch(onError);
    } else {
      //запит по пошуку
      NewsLoad.getSerchList()
        .then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }
          Makemarkup(data.response.docs);
          return data.response.docs;
        })
        .catch(onError);
    }
  }
} else if (NewsLoad.news.length === 0) {
  if (NewsLoad.filter.length > 0) {
    if (NewsLoad.date.length > 0) {
      //запит по фільтру і даті
      NewsLoad.getfilterdatelist()
        .then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }
          Makemarkup(data.response.docs);
          return data.response.docs;
        })
        .catch(onError);
    } else {
      //запит по фільтру
      NewsLoad.getfilterlist()
        .then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }
          Makemarkup(data.response.docs);
          return data.response.docs;
        })
        .catch(onError);
    }
  } else if (NewsLoad.filter.length === 0) {
    if (NewsLoad.date.length > 0) {
      //запит по даті
      NewsLoad.getdatelist()
        .then((data) => {
          if (data.response.docs.length === 0) {
            form.reset();
            newsList.innerHTML = '';
            return createEmptyMarkup();
          }
          Makemarkup(data.response.docs);
          return data.response.docs;
        })
        .catch(onError);
    }
  }
}

function onError(error) {
  createEmptyMarkup();
  console.log(error);
}
