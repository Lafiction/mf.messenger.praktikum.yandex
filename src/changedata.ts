import { attachCollector } from './formDataCollector.js';

const Handlebars = (window as any)['Handlebars'];

const avatar = `
  <div class="avatar">
    <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
  </div>
`;

const nameField = `<input type="text" name="first_name" placeholder="Имя">`;

const lastNameField = `<input type="text" name="second_name" placeholder="Фамилия">`;

const displayNameField = `<input type="text" name="display_name" placeholder="Логин">`;

const emailField = `<input type="email" name="email" placeholder="Почта" required>`;

const phoneField = `<input type="tel" name="phone" placeholder="Телефон">`;

const submitField = `<input type="submit" value="Сохранить">`;

const pageContent = `
  <form class="form" action="#">
    <!-- avatar -->
      {{{ avatar }}}
    <!-- end avatar -->
    <legend>Иван</legend>
    <fieldset>
      <!-- name field -->
        {{{ nameField }}}
      <!-- end name field -->
      <!-- last name field -->
        {{{ lastNameField }}}
      <!-- end last name field -->
      <!-- display name field -->
        {{{ displayNameField }}}
      <!-- end display name field -->
      <!-- email field -->
        {{{ emailNameField }}}
      <!-- end email field -->
      <!-- phone field -->
        {{{ phoneField }}}
      <!-- end phone field -->
      <!-- submit field -->
        {{{ submitField }}}
      <!-- end submit field -->
    </fieldset>
  </form>
`;

const template = Handlebars.compile(pageContent);

const changedataPage = template(
  { 
    avatar,  
    nameField,
    lastNameField,
    displayNameField,
    emailField,
    phoneField,
    submitField
  }
);

const main = document.querySelector('.changedataPage');

if (main) {
  main.innerHTML = changedataPage;
}

attachCollector();

export default {};
