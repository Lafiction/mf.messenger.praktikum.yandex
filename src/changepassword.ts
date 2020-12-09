import { attachCollector } from './formDataCollector.js';
import { TextField } from './components/textField.js';
import { SubmitBtn } from './components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

const avatar = `
  <div class="avatar">
    <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
  </div>
`;

const oldPasswordComponent = new TextField({ 
  fieldType: 'text',
  fieldName: 'old_password',
  placeholder: 'Старый пароль'
});
const oldPassword = oldPasswordComponent.getContent().outerHTML;

const newPasswordComponent = new TextField({ 
  fieldType: 'text',
  fieldName: 'new_password',
  placeholder: 'Новый пароль'
});
const newPassword = newPasswordComponent.getContent().outerHTML;

const repeatPasswordComponent = new TextField({ 
  fieldType: 'text',
  fieldName: 'repeat_password',
  placeholder: 'Повторите пароль'
});
const repeatPassword = repeatPasswordComponent.getContent().outerHTML;

const submitBtnComponent = new SubmitBtn({ value: 'Сохранить' });
const submitBtn = submitBtnComponent.getContent().outerHTML;

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
    submitBtn
  }
);

const main = document.querySelector('.changepasswordPage');

if (main) {
  main.innerHTML = changePasswordPage;
}

attachCollector();

export default {};
