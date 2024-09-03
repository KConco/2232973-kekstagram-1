import { isEscapeKey } from './util.js';

const stack = [];
let listener = null;


const removeEscapeControl = () => {
  stack.length -= 1;
  if (!stack.length) {
    document.removeEventListener('keydown', onDocumentEscape);
    listener = null;
  }
};

const setEscapeControl = (callback, condition = null) => {
  if (!listener) {
    listener = document.addEventListener('keydown', onDocumentEscape);
  }
  stack.push({callback, condition});
};

function onDocumentEscape(evt) {
  if (isEscapeKey(evt)) {
    const index = stack.length - 1;
    stack[index].callback();
    removeEscapeControl();
  }
}

export {setEscapeControl, removeEscapeControl};
