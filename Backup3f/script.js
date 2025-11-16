const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}
