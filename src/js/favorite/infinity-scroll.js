const cardList = document.querySelector('.wrapper__list');
const page = 1;

window.addEventListener('scroll', () => {
    const documentInfScr = cardList.getBoundingClientRect();
    console.log('top', documentInfScr);
    console.log('bottom', documentInfScr);
    if(documentInfScr.bottom < cardList.clientHeight + 100) {
        page++;
    }
})
