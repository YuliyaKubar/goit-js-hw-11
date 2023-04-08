import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { resetPage } from './resetPage';
import { clearGalleryContainer } from './clearGalleryContainer';
import { fetchImages } from './fetchImages';
import { onLoadMore } from './onLoadMore';
import { renderImageGallery } from './renderImageGallery';

const API_KEY = '35069907-16ee8141b79ba130abf84928c';
const BASE_URL = 'https://pixabay.com/api/';
const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.addEventListener('click', onLoadMore);
const galleryEl = document.querySelector('.gallery');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let searchQuery = '';
let currentPage = 1;

export function onSearch(event) {
  resetPage();
  event.preventDefault();
  clearGalleryContainer();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;

  if (searchQuery === '') {
    btnLoadMore.classList.add('is-hidden');
    Notify.failure('Please enter the desired image!');
  } else {
    fetchImages(url).then(data => {
      if (data.total === 0) {
        btnLoadMore.classList.add('is-hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      galleryEl.insertAdjacentHTML('beforeend', renderImageGallery(data));

      lightbox.refresh();

      if (currentPage === Math.ceil(data.totalHits / 40)) {
        btnLoadMore.classList.add('is-hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        btnLoadMore.classList.remove('is-hidden');
      }
    });
  }
}
