const Handlebars = (window as any)['Handlebars'];

const pageContent = `
  <main class="mistake-page page500">
    <p class="mistake-page__header">500</p>
    <p>Мы уже фиксим</p> 
    <p class="registration">Назад к чатам</p>
  </main>`; 

const template = Handlebars.compile(pageContent);

const page500 = template({});

const main = document.querySelector('.app');

if (main) {
  main.innerHTML = page500;
}

export default {};
