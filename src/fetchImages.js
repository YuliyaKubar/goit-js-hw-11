import { renderImageGallery } from './renderImageGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onLoadMore } from './onLoadMore';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

btnLoadMore.addEventListener('click', onLoadMore);
let currentPage = 1;

export async function fetchImages(url) {
  try {
    const response = await axios(url);
    const data = response.data;
    galleryEl.insertAdjacentHTML('beforeend', renderImageGallery(data));

    btnLoadMore.classList.remove('is-hidden');
    lightbox.refresh();

    if (currentPage === Math.ceil(data.totalHits / 40)) {
      btnLoadMore.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      btnLoadMore.style.display = 'block';

      btnLoadMore.classList.remove('is-hidden');
    }
    currentPage += 1;
    return data;
  } catch {
    btnLoadMore.classList.add('is-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
