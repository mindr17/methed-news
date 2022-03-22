const accordeon = document.querySelector('.feature-list');
const accordeonButtons: any = document.querySelectorAll('.feature__link');

accordeonButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    accordeonButtons.forEach(button => {
      button.classList.remove('featuer__link-active');
      button.nextElementSibling.classList.add('hidden');
    });
    btn.classList.toggle('feature-list__active');
    btn.nextElementSibling.classList.toggle('hidden');
  });
});