import { renderGallery } from './gallery.js';
import { fetchData } from './fetch-initial-data.js';
import { applyFilters } from './filter.js';
import './form.js';

fetchData().then((pictures) => {
  renderGallery(pictures);
  applyFilters(pictures, renderGallery);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
});
