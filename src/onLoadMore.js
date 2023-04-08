import { fetchImages } from './fetchImages';
import { renderImageGallery } from './renderImageGallery';
import { lightbox } from './onSearch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const API_KEY = '35069907-16ee8141b79ba130abf84928c';
const BASE_URL = 'https://pixabay.com/api/';

let searchQuery = '';
let currentPage = 1;
const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
btnLoadMore.addEventListener('click', onLoadMore);

export function onLoadMore(event) {
  if (searchQuery !== formEl.elements.searchQuery.value.trim()) {
    currentPage = 1;
  }
  currentPage += 1;
  searchQuery = formEl.elements.searchQuery.value.trim();
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;

  fetchImages(url).then(data => {
    if (data.hits.total === 0) {
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
