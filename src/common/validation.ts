import { getFormData } from '../common/formDataCollector.js';

export function validateFormInput(form: HTMLFormElement, inputName: string, regex: RegExp) {
  form.addEventListener('blur', () => {
    const obj = getFormData(form);

    const validationMsg = form.querySelector(`.${inputName}-validation-msg`);
    const isCorrect = regex.test(obj[inputName]);
    if (validationMsg) {
      if (isCorrect) {
        validationMsg.classList.remove('input-requirements__visible');
      } else {
        validationMsg.classList.add('input-requirements__visible');
      }
    }  
  }, true);

  form.addEventListener('focus', (event) => {
    const focusedEl = event.target as HTMLElement;
    if (focusedEl.tagName.toLowerCase() === 'input') {
      const currentInputName = focusedEl.getAttribute('name');
      if (currentInputName === inputName) {
        const validationMsg = form.querySelector(`.${inputName}-validation-msg`);
        if (validationMsg) {
          validationMsg.classList.remove('input-requirements__visible');
        }
      }
    }
  }, true);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const obj = getFormData(form);
    const validationMsg = form.querySelector(`.${inputName}-validation-msg`);
    const isCorrect = regex.test(obj[inputName]);
    if (validationMsg) {
      if (isCorrect) {
        validationMsg.classList.remove('input-requirements__visible');
      } else {
        validationMsg.classList.add('input-requirements__visible');
      }
    }
    return false;
  });
}
