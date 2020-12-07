function formData() {
  const myForm = document.querySelector("form");
  if (myForm) {
    let elements = myForm.elements;
    let obj = {};
    for (let i = 0; i < elements.length; i++) {
      let item = elements.item(i);
      if (item['name']) {
        obj[item['name']] = item['value'];
      }
    }
    console.log(obj);
  }
}

export function attachCollector() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      formData();
    });
  }  
};
