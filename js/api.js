import { BASE_URL, Route } from './constants.js';
import { showMessage } from './fetch-message.js';

const getData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(() => {
      showMessage('data-error');
    });

const sendData = (body, onSuccess, onError, onFinally) =>
  fetch(`${BASE_URL}${Route.SEND_DATA}`, {
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


export { getData, sendData };
