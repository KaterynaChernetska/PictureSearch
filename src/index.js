import './css/styles.css';
import Notiflix from 'notiflix';
import { createMarkup } from './createMarkUp';
import { PixabayAPI } from './getImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabayAPI = new PixabayAPI();
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const container = document.querySelector('.gallery');
loadMoreBtn.style.display = 'none';

const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onFormSubmit(event) {
  container.innerHTML = '';
  event.preventDefault();
  pixabayAPI.query = event.target.elements.searchQuery.value;
  pixabayAPI.page = 1;
  console.log(pixabayAPI.query);
  event.target.reset();
  onSubmitgetData();
}

function onLoadMoreBtnClick() {
  pixabayAPI.page += 1;
  onLoadMoreGetData();
}

async function onSubmitgetData() {
  try {
    const data = await pixabayAPI.getPhotos();

    if (data.hits.length === 0 || pixabayAPI.query.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.style.display = 'none';
      container.innerHTML = '';
      return;
    }
    if (pixabayAPI.page === 1 && data.totalHits !== 0) {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }
    if (data.totalHits > pixabayAPI.elementsPerPage) {
      loadMoreBtn.style.display = 'flex';
      console.log(pixabayAPI.page);
    }
    container.innerHTML = createMarkup(data.hits);

    simpleLightBox.refresh();
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMoreGetData() {
  try {
    const data = await pixabayAPI.getPhotos();

    if (data.hits.length === 0) {
      loadMoreBtn.style.display = 'none';
    }
    container.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    simpleLightBox.refresh();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
form.addEventListener('submit', onFormSubmit);
