

const inputEl = document.querySelector(".switch-checkbox");
const bodyEl = document.querySelector('body');


inputEl.addEventListener('click', function(){
    bodyEl.classList.toggle('darkTheme');
    
    if (localStorage.getItem('theme') !== 'dark') {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.removeItem('theme');
      }
});


function addDarkClass() {
    try {
      if (localStorage.getItem('theme') === 'dark') {
        bodyEl.classList.add('darkTheme');
        inputEl.checked = true;
      }
     
    } catch (err) {}
  }
  
  addDarkClass();