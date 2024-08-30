import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import { init as applyFilters } from './filter.js';
import './form.js';

getData().then((pictures) => {
  renderGallery(pictures);
  applyFilters(pictures);
});
