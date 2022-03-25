const Choices = require(`choices.js`);
const noPhotoImage = require('../img/no-photo.jpg');

const main = async () => {
  const API_KEY = '98b18d21575d4e84bb6a663a77ff691a';
  const newsList = document.querySelector('.news-list');
  const choicesElem = document.querySelector('.js-choice');
  const formSearch: any = document.querySelector('.form-search');
  const title: any = document.querySelector('.title');
  
  const choices = new Choices(choicesElem, {
    searchEnabled: false,
    itemSelectedText: "",
  });

  const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

  const getData = async (url: string): Promise<any> => {
    
    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_KEY,
      }
    });
    
    const data = await response.json()
    
    return data;
  }

  const getDateCorrectFormat = (isoDate: string): string => {
    const date = new Date(isoDate);
    const fullDate: string = date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const fullTime: string = date.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return `<span class="news-date">${fullDate}</span> ${fullTime}`;
  }

  const getImage = (url: any) => new Promise((resolve, reject) => {
    const image = new Image(270, 200);

    image.addEventListener('load', () => {
      resolve(image);
    });

    image.addEventListener('error', () => {
      image.src = url || noPhotoImage;
      resolve(image);
    });

    image.src = url || noPhotoImage;
    image.className = 'news-image';

    return image;
  });
  
  const renderCard = (data) => {
    newsList.textContent = '';
    data.forEach(async (news) => {
      const card = document.createElement('li');
      card.className = 'news-item';
      
      for (let key in news) {
        if (news[key] === null) {
          news[key] = "";
        }
      }
      
      const {urlToImage, title, url, description, publishedAt, author} = news;

      card.insertAdjacentHTML('beforeend', `
        <a href="${url}" class="news-link-wrapper" target="_blank">     

        </a>
          
        <p class="news-description">${description || ''}</p>
        
        <div class="news-footer">
          <time class="news-datetime" datetime="${publishedAt}">
            ${getDateCorrectFormat(publishedAt)}
          </time>
          <div class="news-author">${author || ''}</div>
        </div>
      `);
      
      const image: any = await getImage(urlToImage);
      image.alt = title;    
      
      let imageDiv = document.createElement('div');
      imageDiv.classList.add('.news-image');
      imageDiv.append(image);
      
      let newsLinkWrapper = card.querySelector('.news-link-wrapper');
      
      let newsItemImageWrapper = document.createElement('div');
      newsItemImageWrapper.classList.add('news-item__image-wrapper');

      newsItemImageWrapper.append(imageDiv);

      newsLinkWrapper.append(newsItemImageWrapper);

      newsLinkWrapper.insertAdjacentHTML('beforeend', `
        <h3 class="news-title">
          <span class="news-link">${title}</span>
        </h3>
      `);

      newsList.append(card);
    }); 
  }
  
  const loadNews = async (): Promise<void> => {
    newsList.textContent = '';
    let preLoad = document.createElement('li');
    preLoad.classList.add('preload');
    newsList.append(preLoad);

    const country = localStorage.getItem('country') || 'ru';
    choices.setChoiceByValue(country);
    title.classList.add('hide');

    // const data = await getData(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=100&category=science`);
    const data = await getData(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=100`);
    renderCard(data.articles);
  }

  const loadSearch = async (value): Promise<void> => {
    const data = await getData(`https://newsapi.org/v2/everything?q=${value}`);
    title.classList.remove('hide');
    
    const articlesCount = data.articles.length;
    const foundWordsArr = ['найден', 'найдено', 'найдено'];
    const resultsWordsArr = ['результат', 'резальтата', 'результатов'];

    title.textContent = `По вашему запросу "новости про ${value}" ${declOfNum(articlesCount, foundWordsArr)} ${articlesCount} ${declOfNum(articlesCount, resultsWordsArr)}`
    choices.setChoiceByValue('');
    renderCard(data.articles);
  }

  choicesElem.addEventListener('change', (event: any) => {
    const value = event.detail.value;
    localStorage.setItem('country', value);
    loadNews();
  })

  formSearch.addEventListener('submit', event => {
    event.preventDefault();
    loadSearch(formSearch.search.value);
    formSearch.reset();
  })

  loadNews();
};
main();