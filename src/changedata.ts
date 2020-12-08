import { attachCollector } from './formDataCollector.js';
import { makeTextField } from './components/textField.js';

const Handlebars = (window as any)['Handlebars'];

const avatar = `
  <div class="avatar">
    <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
  </div>
`;

const nameField = makeTextField('text', 'first_name', 'Имя');
const lastNameField = makeTextField('text', 'last_name', 'Фамилия');
const loginField = makeTextField('text', 'login', 'Логин');
const emailField = makeTextField('email', 'email', 'Почта', true);
const phoneField = makeTextField('tel', 'phone', 'Телефон');

const submitField = `<input type="submit" value="Сохранить">`;

const pageContent = `
  <form class="form" action="#">
    
      {{{ avatar }}}
    
    <legend>Иван</legend>
    <fieldset>
      
      {{{ nameField }}}
    
      {{{ lastNameField }}}
    
      {{{ displayNameField }}}
    
      {{{ emailNameField }}}
    
      {{{ phoneField }}}
    
      {{{ submitField }}}
      
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
