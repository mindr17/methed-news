const newsList = document.querySelector('.news-list');
const card = document.querySelectorAll('.news-item')[0];

for (let i = 0; i < 5; i++) {
  const newCard = card.cloneNode(true);
  newsList.appendChild(newCard);
}

const populateText = (): void => {
  const link = document.querySelectorAll('.news-link')[1];
  const description = document.querySelectorAll('.news-description')[1];
  link.textContent = link.textContent + link.textContent + link.textContent;
  description.textContent = description.textContent + description.textContent + description.textContent;
};
populateText();