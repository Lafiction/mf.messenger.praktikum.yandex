import { handleOnSubmitForm } from '../common/formDataCollector.js';
import { addValidationEventListeners } from '../common/validation.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class ChangePasswordPage extends Block<{}> {
  private oldPasswordComponent: TextField;
  private repeatPasswordComponent: TextField;
  private newPasswordComponent: TextField;
  private submitBtnComponent: SubmitBtn;

  constructor() {
    super('form', {});
  }

  componentDidMount() {
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');
    
    this.oldPasswordComponent = new TextField({ 
      fieldType: 'password',
      fieldName: 'old_password',
      placeholder: 'Старый пароль'
    });
   
    this.newPasswordComponent = new TextField({ 
      fieldType: 'password',
      fieldName: 'new_password',
      placeholder: 'Новый пароль'
    });

    this.repeatPasswordComponent = new TextField({ 
      fieldType: 'password',
      fieldName: 'repeat_password',
      placeholder: 'Повторите пароль'
    });

    this.submitBtnComponent = new SubmitBtn({ value: 'Сохранить' });

    this.oldPasswordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.repeatPasswordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.newPasswordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.submitBtnComponent.eventBus().on(SubmitBtn.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(SubmitBtn.EVENTS.FLOW_RENDER);
    });

    handleOnSubmitForm(this.element as HTMLFormElement);

    if (this.element) {
      addValidationEventListeners(this.element as HTMLFormElement, 'old_password', /^.{8,}$/i);
      addValidationEventListeners(this.element as HTMLFormElement, 'new_password', /^.{8,}$/i);
      addValidationEventListeners(this.element as HTMLFormElement, 'repeat_password', /^.{8,}$/i);
    }
  }
  
  render() {
    const oldPassword = this.oldPasswordComponent.getContent().outerHTML;
    const newPassword = this.newPasswordComponent.getContent().outerHTML;
    const repeatPassword = this.repeatPasswordComponent.getContent().outerHTML;
    const submitBtn = this.submitBtnComponent.getContent().outerHTML;

    const avatar = `
      <div class="avatar">
        <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
      </div>
    `;

    const pageContent = `
      {{{ avatar }}}
    
      <legend>Иван</legend>
      <fieldset>
        
        {{{ oldPassword }}}

        <div class='input-requirements old_password-validation-msg'>
          Длина пароля должна быть не меньше 8 символов.
        </div>
      
        {{{ newPassword }}}

        <div class='input-requirements new_password-validation-msg'>
          Длина пароля должна быть не меньше 8 символов.
        </div>
      
        {{{ repeatPassword }}}

        <div class='input-requirements repeat_password-validation-msg'>
          Длина пароля должна быть не меньше 8 символов.
        </div>
      
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
