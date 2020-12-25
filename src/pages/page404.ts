const Handlebars = (window as any)['Handlebars'];

const pageContent = `
  <main class="mistake-page page404">
    <p class="mistake-page__header">404</p>
    <p>Такой страницы не существует</p> 
    <p class="registration">Назад к чатам</p>
  </main>`; 

const template = Handlebars.compile(pageContent);

const page404 = template({});

const main = document.querySelector('.app');

if (main) {
  main.innerHTML = page404;
}

export default {};
