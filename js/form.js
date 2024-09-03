import { setEscapeControl, removeEscapeControl } from './escape-control.js';
import { isValid, resetValidation } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showMessage } from './fetch-message.js';
import { SumbitStatus, FILE_TYPES } from './constants.js';

const uploadForm = document.querySelector('.img-upload__form');
const preview = document.querySelector('.img-upload__preview img');
const fileUpload = document.querySelector('#upload-file');
const popupUpload = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const tagsField = document.querySelector('.text__hashtags');
const photoComment = document.querySelector('.text__description');

const canBeClosed = () => !(document.activeElement === photoComment || document.activeElement === tagsField);

const openForm = () => {
  popupUpload.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  setEscapeControl(closeForm, canBeClosed);
};

fileUpload.addEventListener('change', () => {
  openForm();
  const file = fileUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});

const resetForm = () => {
  uploadForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
};

resetForm();

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
  removeEscapeControl();
});

const setSubmitStatus = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = SumbitStatus[isDisabled ? 'SENDING' : 'STAND_BY'];
};

const onSuccess = () => {
  closeForm();
  removeEscapeControl();
  showMessage('success');
};

const onError = () => {
  showMessage('error');
};

const onFinally = () => {
  setSubmitStatus(false);
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    const formData = new FormData(uploadForm);
    setSubmitStatus(true);
    sendData(formData, onSuccess, onError, onFinally);
  }
});

function closeForm() {
  popupUpload.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  resetForm();
}

