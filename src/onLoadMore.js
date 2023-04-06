import { fetchImages } from './fetchImages';

const API_KEY = '35069907-16ee8141b79ba130abf84928c';
const BASE_URL = 'https://pixabay.com/api/';

let searchQuery = '';
let currentPage = 1;

export function onLoadMore() {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  fetchImages(url);
}
