import { debounce } from './util.js';

const imgFiltersForm = document.querySelector('.img-filters__form');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const RANDOM_PHOTOS_COUNT = 10;

const applyFilters = (pictures, renderGallery) => {
  const onFilterChange = (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');

      if (evt.target === filterDefault) {
        debounce(() => renderGallery(pictures), 500)();
      } else if (evt.target === filterRandom) {
        const randomPhotos = pictures.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PHOTOS_COUNT);
        debounce(() => renderGallery(randomPhotos), 500)();
      } else if (evt.target === filterDiscussed) {
        const discussedPhotos = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
        debounce(() => renderGallery(discussedPhotos), 500)();
      }
    }
  };

  imgFiltersForm.addEventListener('click', onFilterChange);
};

export { applyFilters };


