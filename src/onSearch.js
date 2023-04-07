import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { resetPage } from './resetPage';
import { clearGalleryContainer } from './clearGalleryContainer';
import { fetchImages } from './fetchImages';
import { onLoadMore } from './onLoadMore';

const API_KEY = '35069907-16ee8141b79ba130abf84928c';
const BASE_URL = 'https://pixabay.com/api/';
const btnLoadMore = document.querySelector('.load-more');
const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

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
    fetchImages(url).then(hits => {
      if (hits.total === 0) {
        btnLoadMore.classList.add('is-hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notify.success(`Hooray! We found ${hits.totalHits} images.`);
      }
    });
  }
}
