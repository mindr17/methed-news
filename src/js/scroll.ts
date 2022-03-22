import * as seamless from "seamless-scroll-polyfill";

const links = document.querySelectorAll('.menu-list__link');
const btn = document.querySelectorAll('.main__btn');

// console.log(typeof(links));
const allLinks = [...links, btn];
console.log(allLinks);

links.forEach((link) => {
  link.addEventListener('click', (event: any) => {
    event.preventDefault();

    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);

    if (section) {
      seamless.scrollIntoView(section, {
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  });
});