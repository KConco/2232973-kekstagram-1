import { setEscapeControl, removeEscapeControl } from './escape-control.js';
import { COMMENTS_TO_RENDER } from './constants.js';

const fullCard = document.querySelector('.big-picture');
const cardImage = fullCard.querySelector('.big-picture__img img');
const cardLikes = fullCard.querySelector('.likes-count');
const cardDescription = fullCard.querySelector('.social__caption');
const cardCommentsCount = fullCard.querySelector('.comments-count');
const shownCommentsCount = fullCard.querySelector('.social__comment-count');
const commentsBlock = document.querySelector('.social__comments');
const commentItem = commentsBlock.querySelector('.social__comment');
const commentsShowMore = document.querySelector('.comments-loader');
const closePhotoButton = document.querySelector('#picture-cancel');

let commentsShown = 0;
let commentsArray = [];

const createComment = ({ avatar, message, name }) => {
  const commentElement = commentItem.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = () => {
  commentsShown += COMMENTS_TO_RENDER;

  if (commentsShown >= commentsArray.length) {
    commentsShowMore.classList.add('hidden');
    commentsShown = commentsArray.length;
  } else {
    commentsShowMore.classList.remove('hidden');
  }

  const commentsListFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(commentsArray[i]);
    commentsListFragment.append(commentElement);
  }

  commentsBlock.innerHTML = '';
  commentsBlock.append(commentsListFragment);
  shownCommentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
};

const onMoreCommentsClick = () => renderComments();

const closeFullPhoto = () => {
  document.querySelector('body').classList.remove('modal-open');
  fullCard.classList.add('hidden');
  commentsShown = 0;
  commentsShowMore.removeEventListener('click', onMoreCommentsClick);
};

const renderFullPhoto = ({ url, likes, comments, description }) => {

  document.querySelector('body').classList.add('modal-open');
  cardImage.src = url;
  cardLikes.textContent = likes;
  cardCommentsCount.textContent = comments.length;
  cardDescription.textContent = description;
  commentsBlock.innerHTML = '';
  commentsArray = comments;
  setEscapeControl(closeFullPhoto);
  renderComments();
  commentsShowMore.addEventListener('click', onMoreCommentsClick);
  fullCard.classList.remove('hidden');
};

closePhotoButton.addEventListener('click', () => {
  closeFullPhoto();
  removeEscapeControl();
});

export { renderFullPhoto };
