import { isEscapeKey } from './util.js';
import { BASE_URL, Route } from './constants.js';

let currentMessageElement = null;

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
};

const onOutsideClick = (evt) => {
  if (
    currentMessageElement &&
    !currentMessageElement.querySelector('.success__inner, .error__inner').contains(evt.target)
  ) {
    removeMessage();
  }
};

const showMessage = (template) => {
  currentMessageElement = template.cloneNode(true);
  document.body.append(currentMessageElement);

  const closeButton = currentMessageElement.querySelector('.success__button, .error__button');
  closeButton.addEventListener('click', removeMessage);

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);
};

function removeMessage() {
  currentMessageElement.remove();
  currentMessageElement = null;
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onOutsideClick);
}

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.error');

const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(() => {
      showMessage(dataErrorTemplate);
    });

const sendData = (body, onSuccess, onError, onFinally) =>
  fetch('https://28.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      onSuccess();
    })
    .catch(() => {
      onError();
    })
    .finally(() => {
      onFinally();
    });


export { getData, showMessage, sendData };
