import header from './header';
import searchform from './searchform';
import weather from './weather';
import themeChange from './themeChange';
// import newslistfiltering from './newslistfiltering';
import './CategoryList/categoryList';
import filteredPagination from './filteredPagination';
import searchPagination from './searchPagination';
import callendar from './calendar';


import NewsServise from './newslist.js';
const LogNews = new NewsServise();
import newslist from './newslist'
import MakeStartMarkup from './CardRender/cardRenderStart'

function yourfunction() {  LogNews.getToplist().then((data) => {
    MakeStartMarkup(data.results);
    return data.results;}) }
    window.onload = yourfunction;
// import NewsServise from './newslist.js';
// const LogNews = new NewsServise();
// import newslist from './newslist'
// import MakeStartMarkup from './CardRender/cardRenderStart'
