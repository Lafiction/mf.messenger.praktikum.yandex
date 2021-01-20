import { getFormData } from './formDataCollector';

export function addValidationEventListeners(page: HTMLElement, inputName: string, regex: RegExp) {
  const visibleInput = 'input-requirements__visible';
  page.addEventListener('blur', () => {
    const form: any = page.querySelector('form');
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

  page.addEventListener('focus', (event) => {
    const focusedEl = event.target as HTMLElement;
    if (focusedEl.tagName.toLowerCase() === 'input') {
      const currentInputName = focusedEl.getAttribute('name');
      if (currentInputName === inputName) {
        const validationMsg = page.querySelector(`.${inputName}-validation-msg`);
        if (validationMsg) {
          validationMsg.classList.remove(visibleInput);
        }
      }
    }
  }, true);

  page.addEventListener('submit', (event) => {
    event.preventDefault();
    const form: any = page.querySelector('form');
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
