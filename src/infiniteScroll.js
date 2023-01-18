import './css/styles.css';
import Notiflix from 'notiflix';
import { createMarkup } from './createMarkUp';
import { PixabayAPI } from './getImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabayAPI = new PixabayAPI();
const form = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const targetEl = document.querySelector('.target-element');
  
  const observer = new IntersectionObserver(
    (entries, observer) => {
      if (!entries[0].isIntersecting) {
        return;
      }
  
      pixabayAPI.page += 1;
  
    console.log('hello')
    onLoadMoreGetData();
  },  {
    root: null,
    rootMargin: '0px 0px 450px 0px',
    threshold: 1.0,
  });


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


async function onSubmitgetData() {
  try {
    const {data} = await pixabayAPI.getPhotos();

    if (data.totalHits === 0 || pixabayAPI.query.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      container.innerHTML = '';
      return;
    }
    if (pixabayAPI.page === 1 && data.totalHits !== 0) {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }

      container.innerHTML = createMarkup(data.hits);     


      setTimeout(() => {
        observer.observe(targetEl);
        console.log('www');
      },100)

      simpleLightBox.refresh();

  } catch (error) {
    console.error(error);
  }
}

async function onLoadMoreGetData() {
  try {   
    const {data}  = await pixabayAPI.getPhotos();

  if (data.hits.length === 0) {
    observer.unobserve(targetEl);
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  container.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    simpleLightBox.refresh();
    // smoothScroll();

  } catch (error) {
    console.error(error);
  }
}

// function smoothScroll() {
//   const  { height: cardHeight } = container.firstElementChild.getBoundingClientRect();
//     return window.scrollBy({
//     top: cardHeight * 2,
//     behavior: "smooth",
// });
// }

form.addEventListener('submit', onFormSubmit);

