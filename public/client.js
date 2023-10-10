const elMundoColumn = document.getElementById('elMundoColumn');
const elPeriodicoColumn = document.getElementById('elPeriodicoColumn');

function fetchRSS(url, container) {
  const req = new XMLHttpRequest();
  req.open('GET', url, true);

  req.onload = function () {
    if (req.status === 200) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(req.responseText, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = item.getElementsByTagName('title')[0].textContent;
        const link = item.getElementsByTagName('link')[0].textContent;
        const pubDate = new Date(item.getElementsByTagName('pubDate')[0].textContent).toLocaleString();
        const description = item.getElementsByTagName('description')[0].textContent;
        const thumbnailUrl = item.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url');

        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
          <h2><a href="${link}" target="_blank">${title}</a></h2>
          <div class="publication-info">
            <p>${pubDate}</p>
          </div>
          ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="${title}" class="news-image">` : ''}
          <p>${description}</p>
        `;

        container.appendChild(newsItem);
      }
    } else {
      console.error('Error fetching RSS feed');
    }
  };

  req.send();
}

fetchRSS('https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml', elMundoColumn);
fetchRSS('https://www.elperiodico.com/es/rss/rss_portada.xml', elPeriodicoColumn);
