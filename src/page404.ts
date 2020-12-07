const Handlebars = (window as any)['Handlebars'];

const pageContent = `
  <p class="mistake-page__header">404</p>
  <p>Такой страницы не существует</p> 
  <p class="registration">Назад к чатам</p>
`; 

const template = Handlebars.compile(pageContent);

const page404 = template({});

const main = document.querySelector('.page404');

if (main) {
  main.innerHTML = page404;
}

export default {};
