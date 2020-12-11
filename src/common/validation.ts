import { getFormData } from '../common/formDataCollector.js';

export function validateFormInput(form: HTMLFormElement, inputName: string, regex: RegExp) {
  const visibleInput = 'input-requirements__visible';
  form.addEventListener('blur', () => {
    const obj = getFormData(form);

    const validationMsg = form.querySelector(`.${inputName}-validation-msg`);
    const isCorrect = regex.test(obj[inputName]);
    if (validationMsg) {
      if (isCorrect) {
        validationMsg.classList.remove(visibleInput);
      } else {
        validationMsg.classList.add(visibleInput);
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
          validationMsg.classList.remove(visibleInput);
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
        validationMsg.classList.remove(visibleInput);
      } else {
        validationMsg.classList.add(visibleInput);
      }
    }
    return false;
  });
}
