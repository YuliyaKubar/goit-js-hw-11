import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onSearch } from './onSearch';
import { onLoadMore } from './onLoadMore';
import { fetchImages } from './fetchImages';
import { renderImageGallery } from './renderImageGallery';
import { resetPage } from './resetPage';
import { clearGalleryContainer } from './clearGalleryContainer';

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
