export function getFormData(form: HTMLFormElement) {
  let elements = form.elements;
  let obj: any = {};
  // здесь i не может быть const, потому что i++ не сработает для константы.
  for (let i = 0; i < elements.length; i++) {
    let item = elements.item(i) as (HTMLInputElement | null);
    if (item && item.name) {
      obj[item.name] = item.value;
    }
  }
  return obj;
}

export function handleOnSubmitForm(page: HTMLElement) {
  page.addEventListener('submit', function(event: any) {
    event.preventDefault();
    const form = page.querySelector('form');
    if (form) {
      console.log(getFormData(form));
    }
  });
};
