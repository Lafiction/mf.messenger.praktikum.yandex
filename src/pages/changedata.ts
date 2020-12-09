import { attachCollector } from '../common/formDataCollector.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class ChangeDataPage extends Block {
  constructor() {
    super("form");
  }

  render() {
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');
    const avatar = `
      <div class="avatar">
        <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
      </div>
    `;

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
      placeholder: 'Логин'
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

    const submitBtnComponent = new SubmitBtn({ value: 'Сохранить' });
    const submitBtn = submitBtnComponent.getContent().outerHTML;

    const pageContent = `
      <form class="form" action="#">
        
          {{{ avatar }}}
        
        <legend>Иван</legend>
        <fieldset>
          
          {{{ nameField }}}
        
          {{{ lastNameField }}}
        
          {{{ loginField }}}
        
          {{{ emailField }}}
        
          {{{ phoneField }}}
        
          {{{ submitBtn }}}
          
        </fieldset>
      </form>`;

    const template = Handlebars.compile(pageContent);

    const changedataPage = template(
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

    return changedataPage;
  }
}

const changedataPageComponent = new ChangeDataPage();
const changedataPage = changedataPageComponent.getContent().outerHTML;

const main = document.querySelector('.changeDataPage');

if (main) {
  main.innerHTML = changedataPage;
}

attachCollector();

export default {};
