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

const setEscapeControl = (cb, condition = null) => {
  if (!listener) {
    listener = document.addEventListener('keydown', onDocumentEscape);
  }
  stack.push({cb, condition});
};

function onDocumentEscape(evt) {
  if (isEscapeKey(evt)) {
    const index = stack.length - 1;
    if(stack[index].condition && !stack[index].condition()){
      return;
    }
    stack[index].cb();
    removeEscapeControl();
  }
}

export {setEscapeControl, removeEscapeControl};
