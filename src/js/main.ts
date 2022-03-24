const Choices = require(`choices.js`);

const main = async () => {
  const API_KEY = '98b18d21575d4e84bb6a663a77ff691a';
  const newsList = document.querySelector('.news-list');
  
  const populateNews = (): void => {
    const newsList = document.querySelector('.news-list');
    const card = document.querySelectorAll('.news-item')[0];
    
    for (let i = 0; i < 5; i++) {
      const newCard = card.cloneNode(true);
      newsList.appendChild(newCard);
    }
  };
  await populateNews();
  
  const populateText = (): void => {
    const link = document.querySelectorAll('.news-link')[1];
    const description = document.querySelectorAll('.news-description')[1];
    link.textContent = link.textContent + link.textContent + link.textContent;
    description.textContent = description.textContent + description.textContent + description.textContent;
  };
  await populateText();
  
  const lessions = () => {
    const choicesElem = document.querySelector('.js-choice');
    
    const choices = new Choices(choicesElem, {
      searchEnabled: false,
      itemSelectedText: "",
    });
  
    const getData = async (url: string) => {
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': API_KEY,
        }
      });
  
      const data = await response.json()
  
      return data;
    }
  
    const renderCard = (data): void => {
      newsList.textContent = '';
      data.forEach((news) => {
        const card = document.createElement('li');
        card.className = 'news-item';
        
        for (let key in news) {
          if (news[key] === null) {
            news[key] = "";
          }
        }

        card.innerHTML = `
          <a href="${news.url}" class="news-link-wrapper" target="_blank">
            <div class="news-item__image-wrapper">
              <img src="${news.urlToImage}" alt="${news.title}" class="news-image" width="270" height="200">
            </div>

            <h3 class="news-title">
              <span class="news-link">${news.title}</span>
            </h3>
          </a>
            
          <p class="news-description">${news.description}</p>
          
          <div class="news-footer">
            <time class="news-datetime" datetime="${news.publishedAt}">
              <span class="news-date">${news.publishedAt}</span> 11:06
            </time>
            <div class="news-author">${news.author}</div>
          </div>
        `;

        newsList.append(card);
      }); 
    }
    
    const loadNews = async () => {
      const data = await getData('https://newsapi.org/v2/top-headlines?country=ru');
      renderCard(data.articles);
    }
    loadNews();
  };
  await lessions();
}
main();