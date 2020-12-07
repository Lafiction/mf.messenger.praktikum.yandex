const Handlebars = (window as any)['Handlebars'];

const pageContent = `
  <p class="mistake-page__header">500</p>
  <p>Мы уже фиксим</p> 
  <p class="registration">Назад к чатам</p>
`; 

const template = Handlebars.compile(pageContent);

const page500 = template({});

const main = document.querySelector('.page500');

if (main) {
  main.innerHTML = page500;
}

export default {};
