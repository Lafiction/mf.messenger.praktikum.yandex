import { handleOnSubmitForm } from '../common/formDataCollector.js';
import { validateFormInput } from '../common/validation.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class RegistrationPage extends Block {
  private nameFieldComponent: TextField;
  private lastNameFieldComponent: TextField;
  private loginFieldComponent: TextField;
  private emailFieldComponent: TextField;
  private phoneFieldComponent: TextField;
  private passwordComponent: TextField;
  private repeatPasswordComponent: TextField;
  private submitBtnComponent: SubmitBtn;

  constructor() {
    super('form');
  }

  componentDidMount() {
    this.nameFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'first_name',
      placeholder: 'Имя'
    });
    
    this.lastNameFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'last_name',
      placeholder: 'Фамилия'
    });

    this.loginFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'login',
      placeholder: 'Логин',
      required: true
    });

    this.emailFieldComponent = new TextField({
      fieldType: 'email',
      fieldName: 'email',
      placeholder: 'Почта',
      required: true
    });

    this.phoneFieldComponent = new TextField({
      fieldType: 'tel',
      fieldName: 'phone',
      placeholder: 'Телефон'
    });

    this.passwordComponent = new TextField({
      fieldType: 'password',
      fieldName: 'password',
      placeholder: 'Пароль',
      required: true
    });

    this.repeatPasswordComponent = new TextField({
      fieldType: 'password',
      fieldName: 'repeat_password',
      placeholder: 'Повторите пароль',
      required: true
    });

    this.submitBtnComponent = new SubmitBtn({ value: 'Зарегистрироваться' });

    this.nameFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.lastNameFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.loginFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.emailFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.phoneFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.passwordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.repeatPasswordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.submitBtnComponent.eventBus().on(SubmitBtn.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(SubmitBtn.EVENTS.FLOW_RENDER);
    });

    handleOnSubmitForm(this.element as HTMLFormElement);
    
    if (this.element) {
      validateFormInput(this.element as HTMLFormElement, 'login', /^[a-zа-я0-9_]+$/i);
      validateFormInput(this.element as HTMLFormElement, 'password', /^.{8,}$/i);
      validateFormInput(this.element as HTMLFormElement, 'repeat_password', /^.{8,}$/i);
    }
  }

  render() {
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');

    const nameField = this.nameFieldComponent.getContent().outerHTML;
    const lastNameField = this.lastNameFieldComponent.getContent().outerHTML;
    const loginField = this.loginFieldComponent.getContent().outerHTML;
    const emailField = this.emailFieldComponent.getContent().outerHTML;
    const phoneField = this.phoneFieldComponent.getContent().outerHTML;
    const passwordField = this.passwordComponent.getContent().outerHTML;
    const repeatPasswordField = this.repeatPasswordComponent.getContent().outerHTML;
    const submitBtn = this.submitBtnComponent.getContent().outerHTML;

    const pageContent = `
      <form class="form" action="#">
        <legend>Регистрация</legend>  
        <fieldset>
          
          {{{ nameField }}}
        
          {{{ lastNameField }}}
        
          {{{ loginField }}}

          <div class='input-requirements login-validation-msg'>
            Логин должен состоять только из букв, цифр и знаков '_'.
          </div>
        
          {{{ emailField }}}
        
          {{{ phoneField }}}
        
          {{{ passwordField }}}

          <div class='input-requirements password-validation-msg'>
            Длина пароля должна быть не меньше 8 символов.
          </div>
        
          {{{ repeatPasswordField }}}

          <div class='input-requirements repeat_password-validation-msg'>
            Длина пароля должна быть не меньше 8 символов.
          </div>
        
          {{{ submitBtn }}}
        
          <a href="index.html" class="registration">Войти</a>
          
        </fieldset>
      </form>`;

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
        submitBtn
      }
    );

    return registrationPage;
  }
}

const registrationPageComponent = new RegistrationPage();

const main = document.querySelector('.registrationPage');

if (main) {
  main.appendChild(registrationPageComponent.getContent());
}

export default {};
