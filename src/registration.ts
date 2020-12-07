import { attachCollector } from './formDataCollector.js';

const Handlebars = (window as any)['Handlebars'];

const nameField = `<input type="text" name="first_name" placeholder="Имя">`;

const lastNameField = `<input type="text" name="second_name" placeholder="Фамилия">`;

const loginField = `<input type="text" name="display_name" placeholder="Логин">`;

const emailField = `<input type="email" name="email" placeholder="Почта" required`;

const phoneField = `<input type="tel" name="phone" placeholder="Телефон">`;

const passwordField = `<input type="text" name="password" placeholder="Пароль">`;

const submitField = `<input type="submit" value="Зарегистрироваться">`;

const pageContent = `
  <form class="form" action="#">
    <legend>Регистрация</legend>  
    <fieldset>
      <!-- name field -->
        {{{ nameField }}}
      <!-- end name field -->
      <!-- last name field -->
        {{{ lastNameField }}}
      <!-- end last name field -->
      <!-- display name field -->
        {{{ loginField }}}
      <!-- end display name field -->
      <!-- email field -->
        {{{ emailField }}}
      <!-- end email field -->
      <!-- phone field -->
        {{{ phoneField }}}
      <!-- end phone field -->
      <!-- password field -->
        {{{ passwordField }}}
      <!-- end password field -->
      <!-- password field -->
        {{{ passwordField }}}
      <!-- end password field -->
      <!-- submit field -->
        {{{ submitField }}}
      <!-- end submit field -->
      <!-- registration -->
      <a href="index.html" class="registration">Войти</a>
      <!-- end registration -->
    </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const registrationPage = template(
  {  
    nameField,
    lastNameField, 
    loginField,
    emailField,
    phoneField,
    passwordField,
    submitField
  }
);

const main = document.querySelector('.registrationPage');

if (main) {
  main.innerHTML = registrationPage;
}

attachCollector();

export default {};
