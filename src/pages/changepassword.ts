import { attachCollector } from '../common/formDataCollector.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class ChangePasswordPage extends Block {
  constructor() {
    super('form');
  }

  componentDidMount() {
    attachCollector(this.element as HTMLFormElement);
  }
  
  render() {
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');
    
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
      {{{ avatar }}}
    
      <legend>Иван</legend>
      <fieldset>
        
        {{{ oldPassword }}}
      
        {{{ newPassword }}}
      
        {{{ repeatPassword }}}
      
        {{{ submitBtn }}}
      
      </fieldset>`; 

    const template = Handlebars.compile(pageContent);

    const changePasswordPage = template(
      { 
        avatar,  
        oldPassword,
        newPassword,
        repeatPassword,
        submitBtn
      });


    return changePasswordPage;
  }
}

const changePasswordPageComponent = new ChangePasswordPage();

const main = document.querySelector('.changePasswordPage');

if (main) {
  main.appendChild(changePasswordPageComponent.getContent());
}

export default {};
