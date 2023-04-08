import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onLoadMore } from './onLoadMore';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const btnLoadMore = document.querySelector('.load-more');

btnLoadMore.addEventListener('click', onLoadMore);
let currentPage = 1;

export async function fetchImages(url) {
  try {
    const response = await axios(url);
    const data = response.data;
    return data;
  } catch {
    btnLoadMore.classList.add('is-hidden');
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
