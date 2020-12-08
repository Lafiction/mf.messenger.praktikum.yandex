import { attachCollector } from './formDataCollector.js';
import { makeTextField } from './components/textField.js';
import { makeSubmitBtn } from './components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

const nameField = makeTextField('text', 'first_name', 'Имя');
const lastNameField = makeTextField('text', 'last_name', 'Фамилия');
const loginField = makeTextField('text', 'login', 'Логин');
const emailField = makeTextField('email', 'email', 'Почта', true);
const phoneField = makeTextField('tel', 'phone', 'Телефон');
const passwordField = makeTextField('text', 'password', 'Пароль');
const repeatPasswordField = makeTextField('text', 'password', 'Повторите пароль');

const submitField = makeSubmitBtn('Зарегистрироваться');

const pageContent = `
  <form class="form" action="#">
    <legend>Регистрация</legend>  
    <fieldset>
      
      {{{ nameField }}}
    
      {{{ lastNameField }}}
    
      {{{ loginField }}}
    
      {{{ emailField }}}
    
      {{{ phoneField }}}
    
      {{{ passwordField }}}
    
      {{{ repeatPasswordField }}}
    
      {{{ submitField }}}
    
      <a href="index.html" class="registration">Войти</a>
      
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
    repeatPasswordField,
    submitField
  }
);

const main = document.querySelector('.registrationPage');

if (main) {
  main.innerHTML = registrationPage;
}

attachCollector();

export default {};
