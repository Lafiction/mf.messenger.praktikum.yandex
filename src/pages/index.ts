import * as Handlebars from 'handlebars';
import { handleOnSubmitForm, getFormData } from '@common/formDataCollector';
import { addValidationEventListeners } from '@common/validation';
import { Block } from '@common/block';
import { TextField } from '@components/textField';
import { SubmitBtn } from '@components/submitBtn';
import { MessengerAPI } from '@common/messengerAPI';
import { Router } from '@common/router';
import { loginRegexp, passwordRegexp } from '@common/constants';

export class IndexPage extends Block<{}> {
  private loginFieldComponent!: TextField;

  private passwordFieldComponent!: TextField;

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
    this.api.signIn(data.login, data.password).then(() => {
      const router = new Router('router is already created in app.ts');
      router.go('/messenger');
    }).catch((error: Error) => {
      alert(`Ошибка ${error}`);
      this.api.signOut().catch(() => {});
    });
  }

  componentDidMount() {
    this.element.classList.add('indexPage');

    this.loginFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'login',
      placeholder: 'Логин',
      required: true,
    });

    this.passwordFieldComponent = new TextField({
      fieldType: 'password',
      fieldName: 'password',
      placeholder: 'Пароль',
      required: true,
    });

    this.submitBtnComponent = new SubmitBtn({ value: 'Авторизоваться' });

    this.loginFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.passwordFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.submitBtnComponent.eventBus().on(SubmitBtn.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(SubmitBtn.EVENTS.FLOW_RENDER);
    });

    handleOnSubmitForm(this.element);

    if (this.element) {
      addValidationEventListeners(this.element, 'login', loginRegexp);
      addValidationEventListeners(this.element, 'password', passwordRegexp);
    }

    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit();
    });
  }

  render() {
    const loginField = this.loginFieldComponent.getOuterHTML();
    const passwordField = this.passwordFieldComponent.getOuterHTML();
    const submitBtn = this.submitBtnComponent.getOuterHTML();

    const pageContent = `
     
        <form class="form" action="#">

          <fieldset>
            <legend>Вход</legend>
            
            {{{ loginField }}}

            <div class='input-requirements login-validation-msg'>
              Логин должен состоять только из букв, цифр и знаков '_'.
            </div>

            {{{ passwordField }}}

            <div class='input-requirements password-validation-msg'>
              Длина пароля должна быть не меньше 4 символов. 
            </div>
            
            {{{ submitBtn }}}
            
            <a href='registration' class='registration'>Нет аккаунта</a>
          </fieldset>
          
        </form>`;

    const template = Handlebars.compile(pageContent);

    const indexPage = template(
      {
        loginField,
        passwordField,
        submitBtn,
      },
    );

    return indexPage;
  }
}
