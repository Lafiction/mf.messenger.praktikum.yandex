function formData(form: HTMLFormElement) {
  let elements = form.elements;
  let obj: any = {};
  for (let i = 0; i < elements.length; i++) {
    let item: any = elements.item(i);
    if (item && item['name']) {
      obj[item['name']] = item['value'];
    }
  }
  console.log(obj);
}

export function attachCollector(form: HTMLFormElement) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    formData(form);
  });
};
