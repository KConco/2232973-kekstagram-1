import {setEscapeControl, removeEscapeControl} from './escape-control.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const templates = {
  'success': successMessage,
  'error': errorMessage,
  'data-error': dataErrorTemplate,
};


const closeMessage = (template) => {
  const message = document.querySelector(`.${template}`);
  message.remove();
};

const showMessage = (template) => {
  const messageElement = templates[template].cloneNode(true);
  document.body.append(messageElement);
  const button = document.querySelector(`.${template}__button`);
  messageElement.addEventListener('click', (evt) => {
    if (evt.target === button || evt.target.classList.contains(template)) {
      closeMessage(template);
      removeEscapeControl();
    }
  });
  setEscapeControl(closeMessage);
};

export {showMessage};
