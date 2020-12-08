import { attachCollector } from './formDataCollector.js';
import { makeTextField } from './components/textField.js';
import { makeSubmitBtn } from './components/submitBtn.js';


const Handlebars = (window as any)['Handlebars'];

const loginField = makeTextField('text', 'login', 'Логин');
const passwordField = makeTextField('text', 'password', 'Пароль');

const submitField = makeSubmitBtn('Авторизоваться');

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
