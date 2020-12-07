import { attachCollector } from './formDataCollector.js';

const Handlebars = (window as any)['Handlebars'];

const pageContent = `
  <form class="form" action="#">
  <fieldset>
    <legend>Вход</legend>
    <label>
      Логин
      <input type="text" name="login">
    </label>
    <label>
      Пароль
      <input type="text" name="password">
    </label>
    <label>
      <input type="submit" value="Авторизоваться">
    </label>
    <p class="registration">Нет аккаунта</p>
  </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const indexPage = template({});

const main = document.querySelector('.indexPage');

if (main) {
  main.innerHTML = indexPage;
}

attachCollector();

export default {};
