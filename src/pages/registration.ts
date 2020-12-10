import { attachCollector } from '../common/formDataCollector.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class RegistrationPage extends Block {
  constructor() {
    super('form');
  }

  componentDidMount() {
    attachCollector(this.element as HTMLFormElement);
  }

  render() {
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');

    const nameFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'first_name',
      placeholder: 'Имя'
    });
    const nameField = nameFieldComponent.getContent().outerHTML;

    const lastNameFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'last_name',
      placeholder: 'Фамилия'
    });
    const lastNameField = lastNameFieldComponent.getContent().outerHTML;

    const loginFieldComponent = new TextField({
      fieldType: 'text',
      fieldName: 'login',
      placeholder: 'Логин',
      required: true
    });
    const loginField = loginFieldComponent.getContent().outerHTML;

    const emailFieldComponent = new TextField({
      fieldType: 'email',
      fieldName: 'email',
      placeholder: 'Почта',
      required: true
    });
    const emailField = emailFieldComponent.getContent().outerHTML;

    const phoneFieldComponent = new TextField({
      fieldType: 'tel',
      fieldName: 'phone',
      placeholder: 'Телефон'
    });
    const phoneField = phoneFieldComponent.getContent().outerHTML;

    const passwordComponent = new TextField({
      fieldType: 'text',
      fieldName: 'password',
      placeholder: 'Пароль',
      required: true
    });
    const passwordField = passwordComponent.getContent().outerHTML;

    const repeatPasswordComponent = new TextField({
      fieldType: 'text',
      fieldName: 'repeat_password',
      placeholder: 'Повторите пароль',
      required: true
    });
    const repeatPasswordField = repeatPasswordComponent.getContent().outerHTML;

    const submitBtnComponent = new SubmitBtn({ value: 'Зарегистрироваться' });
    const submitBtn = submitBtnComponent.getContent().outerHTML;

    const pageContent = `
      <form class="form" action="#">
        <legend>Регистрация</legend>  
        <fieldset>
          
          {{{ nameField }}}
        
          {{{ lastNameField }}}
        
          {{{ loginField }}}
        
          {{{ emailField }}}
        
          {{{ phoneField }}}
        
          {{{ passwordField }}}
        
          {{{ repeatPasswordField }}}
        
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
