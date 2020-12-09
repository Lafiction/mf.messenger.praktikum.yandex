import { attachCollector } from './formDataCollector.js';
import { TextField } from './components/textField.js';
import { SubmitBtn } from './components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

const passwordFieldComponent = new TextField({ 
  fieldType: 'text',
  fieldName: 'password',
  placeholder: 'Пароль',
  required: true
});
const passwordField = passwordFieldComponent.getContent().outerHTML;

const loginFieldComponent = new TextField({ 
  fieldType: 'text',
  fieldName: 'login',
  placeholder: 'Логин',
  required: true
});
const loginField = loginFieldComponent.getContent().outerHTML;

const submitFieldComponent = new SubmitBtn({ value: 'Авторизоваться' });
const submitField = submitFieldComponent.getContent().outerHTML;

const pageContent = `
  <form class="form" action="#">
  <fieldset>
    <legend>Вход</legend>
    
    {{{ loginField }}}
    
    {{{ passwordField }}}
    
    {{{ submitField }}}
    
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
