const burger = document.querySelector('.humburger-menu');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu-list__item');

burger.addEventListener('click', () => {
  menu.classList.add('menu-active');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.add('menu-active');
  });
});

document.addEventListener('click', (event: any) => {
  if (!(event.target.closest('.menu') || event.target.closest('.humburger-menu'))) {
    menu.classList.remove('menu-active');
  }
});