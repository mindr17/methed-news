const tabButtons: any = document.querySelectorAll('.design-list__item');
const tabDescriptions: any = document.querySelectorAll('.design__descr');
const tabImages: any = document.querySelectorAll('.design-images');

const changeContent = (array, value) => {
  array.forEach((item) => {
    if (item.dataset.tabsField === value) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

tabButtons.forEach((tabButton: any) => {
  tabButton.addEventListener('click', (event) => {
    const dataValue: string = tabButton.dataset.tabsHandler;

    changeContent(tabDescriptions, dataValue);
    changeContent(tabImages, dataValue);

    tabButtons.forEach((btn) => {
      if (btn === event.target) {
        btn.classList.add('design-list__item_active');
      } else {
        btn.classList.remove('design-list__item_active');
      }
    });

    document.title = event.target.textContent;
  })
});