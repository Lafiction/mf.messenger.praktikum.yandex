import { handleOnSubmitForm, getFormData } from '../common/formDataCollector.js';
import { addValidationEventListeners } from '../common/validation.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';
import { MessengerAPI } from '../common/messengerAPI.js';
import { Router } from '../common/router.js';


const Handlebars = (window as any)['Handlebars'];

export class IndexPage extends Block<{}> {
  private loginFieldComponent: TextField;
  private passwordFieldComponent: TextField;
  private submitBtnComponent: SubmitBtn;
  private api: MessengerAPI;

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
    this.api.signIn(data.login, data.password).then((response: any) => {
      if (response.status >= 200 && response.status <= 299) {
        const router = new Router('router is already created in app.ts');
        router.go('/messenger');
      } else {
        alert('Ошибка' + response.responseText);
        this.api.signOut();
      }
    }).catch((error: any) => {
      console.log('Неизвестная ошибка', error);
    });
  }

  componentDidMount() {
    this.element.classList.add('indexPage');

    this.loginFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'login',
      placeholder: 'Логин',
      required: true
    });

    this.passwordFieldComponent = new TextField({
      fieldType: 'password',
      fieldName: 'password',
      placeholder: 'Пароль',
      required: true
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
      addValidationEventListeners(this.element, 'login', /^[a-zа-я0-9_]+$/i);
      addValidationEventListeners(this.element, 'password', /^.{4,}$/i);
    }

    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit();
    }); 
  }

  render() {
    const loginField = this.loginFieldComponent.getContent().outerHTML;
    const passwordField = this.passwordFieldComponent.getContent().outerHTML;
    const submitBtn = this.submitBtnComponent.getContent().outerHTML;

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
        submitBtn
      }
    );

    return indexPage;
  }
}
