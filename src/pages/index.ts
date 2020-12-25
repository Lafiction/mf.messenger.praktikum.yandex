import { handleOnSubmitForm } from '../common/formDataCollector.js';
import { addValidationEventListeners } from '../common/validation.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class IndexPage extends Block<{}> {
  private loginFieldComponent: TextField;
  private passwordFieldComponent: TextField;
  private submitBtnComponent: SubmitBtn;

  constructor() {
    super('main', {});
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

    handleOnSubmitForm(this.element as HTMLFormElement);

    if (this.element) {
      addValidationEventListeners(this.element as HTMLFormElement, 'login', /^[a-zа-я0-9_]+$/i);
      addValidationEventListeners(this.element as HTMLFormElement, 'password', /^.{8,}$/i);
    }
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
              Длина пароля должна быть не меньше 8 символов. 
            </div>
            
            {{{ submitBtn }}}
            
            <a href='registration.html' class='registration'>Нет аккаунта</a>
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

const indexPageComponent = new IndexPage();

const mainDiv = document.querySelector('.app');

if (mainDiv) {
  mainDiv.appendChild(indexPageComponent.getContent());
}

export default {};
