import { attachCollector } from './formDataCollector.js';

const Handlebars = (window as any)['Handlebars'];

const loginField = `<input type="text" name="login" placeholder="Логин">`;

const passwordField = `<input type="text" name="password" placeholder="Пароль">`;

const submitField = `<input type="submit" value="Авторизоваться">`;

const pageContent = `
  <form class="form" action="#">
  <fieldset>
    <legend>Вход</legend>
    <!-- login field -->
      {{{ loginField }}}
    <!-- end login field -->
    <!-- password field -->
      {{{ passwordField }}}
    <!-- end password field -->
    <!-- submit field -->
      {{{ submitField }}}
    <!-- end submit field -->
    <a href="registration.html" class="registration">Нет аккаунта</a>
  </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const indexPage = template(
  { 
    loginField,  
    passwordField,
    submitField
  }
);

const main = document.querySelector('.indexPage');

if (main) {
  main.innerHTML = indexPage;
}

attachCollector();

export default {};
