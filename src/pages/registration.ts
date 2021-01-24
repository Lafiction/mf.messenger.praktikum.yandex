import * as Handlebars from 'handlebars';
import { handleOnSubmitForm, getFormData } from '../common/formDataCollector';
import { addValidationEventListeners } from '../common/validation';
import { Block } from '../common/block';
import { TextField } from '../components/textField';
import { SubmitBtn } from '../components/submitBtn';
import { MessengerAPI } from '../common/messengerAPI';
import { Router } from '../common/router';

export class RegistrationPage extends Block<{}> {
  private nameFieldComponent!: TextField;

  private lastNameFieldComponent!: TextField;

  private loginFieldComponent!: TextField;

  private emailFieldComponent!: TextField;

  private phoneFieldComponent!: TextField;

  private passwordComponent!: TextField;

  private repeatPasswordComponent!: TextField;

  private submitBtnComponent!: SubmitBtn;

  private api!: MessengerAPI;

  constructor() {
    super('main', {});
  }

  init() {
    this.api = new MessengerAPI();
    super.init();
  }

  private onSubmit() {
    const form: any = this.element.querySelector('form');
    const data = getFormData(form);
    this.api.registration(data).then(() => {
      const router = new Router('router is already created in app.ts');
      alert('Вы зарегистрированы');
      router.go('/messenger');
    }).catch((error: Error) => {
      alert(`Ошибка ${error}`);
      this.api.signOut().catch(() => {});
    });
  }

  componentDidMount() {
    this.element.classList.add('registrationPage');

    this.nameFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'first_name',
      placeholder: 'Имя',
    });

    this.lastNameFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'second_name',
      placeholder: 'Фамилия',
    });

    this.loginFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'login',
      placeholder: 'Логин',
      required: true,
    });

    this.emailFieldComponent = new TextField({
      fieldType: 'email',
      fieldName: 'email',
      placeholder: 'Почта',
      required: true,
    });

    this.phoneFieldComponent = new TextField({
      fieldType: 'tel',
      fieldName: 'phone',
      placeholder: 'Телефон',
    });

    this.passwordComponent = new TextField({
      fieldType: 'password',
      fieldName: 'password',
      placeholder: 'Пароль',
      required: true,
    });

    this.repeatPasswordComponent = new TextField({
      fieldType: 'password',
      fieldName: 'repeat_password',
      placeholder: 'Повторите пароль',
      required: true,
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

    handleOnSubmitForm(this.element);

    if (this.element) {
      addValidationEventListeners(this.element, 'login', /^[a-zа-я0-9_]+$/i);
      addValidationEventListeners(this.element, 'password', /^.{4,}$/i);
      addValidationEventListeners(this.element, 'repeat_password', /^.{4,}$/i);
    }

    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit();
    });
  }

  render() {
    const nameField = this.nameFieldComponent.getOuterHTML();
    const lastNameField = this.lastNameFieldComponent.getOuterHTML();
    const loginField = this.loginFieldComponent.getOuterHTML();
    const emailField = this.emailFieldComponent.getOuterHTML();
    const phoneField = this.phoneFieldComponent.getOuterHTML();
    const passwordField = this.passwordComponent.getOuterHTML();
    const repeatPasswordField = this.repeatPasswordComponent.getOuterHTML();
    const submitBtn = this.submitBtnComponent.getOuterHTML();

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
            Длина пароля должна быть не меньше 4 символов.
          </div>
        
          {{{ repeatPasswordField }}}

          <div class='input-requirements repeat_password-validation-msg'>
            Длина пароля должна быть не меньше 4 символов.
          </div>
        
          {{{ submitBtn }}}
        
          <a href="/" class="registration">Войти</a>
          
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
        submitBtn,
      },
    );

    return registrationPage;
  }
}
