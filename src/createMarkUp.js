export function createMarkup(array) {
     return array.map(el => 
        `<a class="gallery__item" 
        href = "${el.largeImageURL}">
        <div class="photo-card">
        <img class="gallery__image" src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /> 
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${el.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${el.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${el.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${el.downloads}
          </p>
        </div>
      </div>
      </a>
      `
        ).join('')
    }
  

