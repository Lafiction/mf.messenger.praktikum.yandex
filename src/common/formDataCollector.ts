export function getFormData(form: HTMLFormElement) {
  const { elements } = form;
  const obj: any = {};
  for (let i = 0; i < elements.length; i++) {
    const item = elements.item(i) as (HTMLInputElement | null);
    if (item && item.name) {
      obj[item.name] = item.value;
    }
  }
  return obj;
}

export function handleOnSubmitForm(page: HTMLElement) {
  page.addEventListener('submit', (event: any) => {
    event.preventDefault();
    const form = page.querySelector('form');
    if (form) {
      console.log(getFormData(form));
    }
  });
}
