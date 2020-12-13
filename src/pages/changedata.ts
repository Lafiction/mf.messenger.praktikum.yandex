import { handleOnSubmitForm } from '../common/formDataCollector.js';
import { addValidationEventListeners } from '../common/validation.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class ChangeDataPage extends Block {
  private nameFieldComponent: TextField;
  private lastNameFieldComponent: TextField;
  private loginFieldComponent: TextField;
  private emailFieldComponent: TextField;
  private phoneFieldComponent: TextField;
  private submitBtnComponent: SubmitBtn;

  constructor() {
    super('form');
  }

  componentDidMount() {
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');
    
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
      placeholder: 'Логин'
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

    this.submitBtnComponent = new SubmitBtn({ value: 'Сохранить' });

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

    this.submitBtnComponent.eventBus().on(SubmitBtn.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(SubmitBtn.EVENTS.FLOW_RENDER);
    });

    handleOnSubmitForm(this.element as HTMLFormElement);


    if (this.element) {
      addValidationEventListeners(this.element as HTMLFormElement, 'login', /^[a-zа-я0-9_]+$/i);
    }
  }

  render() {
    const avatar = `
      <div class="avatar">
        <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
      </div>
    `;

    const nameField = this.nameFieldComponent.getContent().outerHTML;
    const lastNameField = this.lastNameFieldComponent.getContent().outerHTML;
    const loginField = this.loginFieldComponent.getContent().outerHTML;
    const emailField = this.emailFieldComponent.getContent().outerHTML;
    const phoneField = this.phoneFieldComponent.getContent().outerHTML;
    const submitBtn = this.submitBtnComponent.getContent().outerHTML;

    const pageContent = `
      {{{ avatar }}}
      
      <legend>Иван</legend>
      <fieldset>
        
        {{{ nameField }}}
      
        {{{ lastNameField }}}
      
        {{{ loginField }}}

        <div class='input-requirements login-validation-msg'>
          Логин должен состоять только из букв, цифр и знаков '_'.
        </div>
      
        {{{ emailField }}}
      
        {{{ phoneField }}}
      
        {{{ submitBtn }}}
        
      </fieldset>`;

    const template = Handlebars.compile(pageContent);

    const changeDataPage = template(
      { 
        avatar,  
        nameField,
        lastNameField,
        loginField,
        emailField,
        phoneField,
        submitBtn
      }
    );

    return changeDataPage;
  }
}

const changeDataPageComponent = new ChangeDataPage();

const main = document.querySelector('.changeDataPage');

if (main) {
  main.appendChild(changeDataPageComponent.getContent());
}

export default {};
