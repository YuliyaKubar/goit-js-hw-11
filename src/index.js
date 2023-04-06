import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '35069907-16ee8141b79ba130abf84928c';
const BASE_URL = 'https://pixabay.com/api/';

const formEl = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let searchQuery = '';
let currentPage = 1;

formEl.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(event) {
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

function onLoadMore() {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  fetchImages(url);
}

async function fetchImages(url) {
  try {
    const response = await axios(url);
    const hits = response.data;
    galleryEl.insertAdjacentHTML('beforeend', renderImageGallery(hits));
    currentPage += 1;
    btnLoadMore.classList.remove('is-hidden');
    lightbox.refresh();
    return hits;
  } catch {
    btnLoadMore.classList.add('is-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function renderImageGallery(hits) {
  return hits.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
<a class='gallery__link' href='${largeImageURL}'><img class='gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy"
<div class="info">
  <p class="info-item">
    <b>Likes:${likes}</b>
  </p>
  <p class="info-item">
    <b>Views:${views}</b>
  </p>
  <p class="info-item">
    <b>Comments:${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads:${downloads}</b>
  </p>
</div>
</div>`;
      }
    )
    .join('');
}

function clearGalleryContainer() {
  galleryEl.innerHTML = '';
}

function resetPage() {
  currentPage = 1;
}
