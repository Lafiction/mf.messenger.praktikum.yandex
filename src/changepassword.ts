import { attachCollector } from './formDataCollector.js';
import { makeTextField } from './components/textField.js';

import { SubmitBtn } from './components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

const avatar = `
  <div class="avatar">
    <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
  </div>
`;

const oldPassword = makeTextField('text', 'password', 'Старый пароль');
const newPassword = makeTextField('text', 'password', 'Новый пароль');
const repeatPassword = makeTextField('text', 'password', 'Повторите пароль');

const submitFieldComponent = new SubmitBtn({ value: 'Сохранить' });
const submitField = submitFieldComponent.getContent().outerHTML;

const pageContent = `
  <form class="form" action="">
    
      {{{ avatar }}}
   
    <legend>Иван</legend>
    <fieldset>
      
      {{{ oldPassword }}}
    
      {{{ newPassword }}}
    
      {{{ repeatPassword }}}
    
      {{{ submitField }}}
     
    </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const changePasswordPage = template(
  { 
    avatar,  
    oldPassword,
    newPassword,
    repeatPassword,
    submitField
  }
);

const main = document.querySelector('.changepasswordPage');

if (main) {
  main.innerHTML = changePasswordPage;
}

attachCollector();

export default {};
