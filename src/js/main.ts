const newsList = document.querySelector('.news-list');
const card = document.querySelectorAll('.news-item')[0];

for (let i = 0; i < 5; i++) {
  const newCard = card.cloneNode(true);
  newsList.appendChild(newCard);
}