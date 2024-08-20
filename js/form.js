import { isEscapeKey } from './util.js';
import { isValid, resetValidation } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { showMessage } from './fetch-result.js';
import { SumbitStatus } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileUpload = document.querySelector('#upload-file');
const popupUpload = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const tagsField = document.querySelector('.text__hashtags');
const photoComment = document.querySelector('.text__description');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const openForm = () => {
  popupUpload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

fileUpload.addEventListener('change', () => {
  openForm();
});

const resetForm = () => {
  uploadForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
};

resetForm();

const closeForm = () => {
  popupUpload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

const setSubmitStatus = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = SumbitStatus[isDisabled ? 'SENDING' : 'STAND_BY'];
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    const formData = new FormData(uploadForm);
    setSubmitStatus(true);
    fetch('https://28.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          showMessage(successMessage);
          closeForm();
        } else {
          showMessage(errorMessage);
          throw new Error(response.status);
        }
      })
      .catch(() => {
        showMessage(errorMessage);
      })
      .finally(() => {
        setSubmitStatus(false);
      });
  }
});

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement === photoComment || document.activeElement === tagsField) {
      return document.activeElement.blur();
    }
    closeForm();
  }
}
