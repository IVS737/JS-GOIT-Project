export default (() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.burger-btn-open');

  const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
  };

  openMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
  });

  // add current page class

  const home = document.querySelector('.home-current');
  const favorite = document.querySelector('.favorite-current');
  const read = document.querySelector('.read-current');

  const checkCurrentPage = () => {
    if (window.location.href.includes('#readPage.html')) {
      read.classList.add('current');
    }
    if (window.location.href.includes('#favoritePage.html')) {
      favorite.classList.add('current');
    }
    if (window.location.href.includes('#mainPage.html' || '#index.html')) {
      home.classList.add('current');
    }
  };

  checkCurrentPage();
})();
