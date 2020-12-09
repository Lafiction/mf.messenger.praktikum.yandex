import { attachCollector } from '../common/formDataCollector.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class IndexPage extends Block {
  constructor() {
    super("form");
  }

  render() {
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');
    
    const loginFieldComponent = new TextField({ 
      fieldType: 'text',
      fieldName: 'login',
      placeholder: 'Логин',
      required: true
    });
    const loginField = loginFieldComponent.getContent().outerHTML;
    
    const passwordFieldComponent = new TextField({ 
      fieldType: 'text',
      fieldName: 'password',
      placeholder: 'Пароль',
      required: true
    });
    const passwordField = passwordFieldComponent.getContent().outerHTML;
    
    const submitBtnComponent = new SubmitBtn({ value: 'Авторизоваться' });
    const submitBtn = submitBtnComponent.getContent().outerHTML;

    const pageContent = `
      <fieldset>
        <legend>Вход</legend>
        
        {{{ loginField }}}
        
        {{{ passwordField }}}
        
        {{{ submitBtn }}}
        
        <a href="registration.html" class="registration">Нет аккаунта</a>
      </fieldset>`; 

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
const indexPage = indexPageComponent.getContent().outerHTML;

const main = document.querySelector('.indexPage');

if (main) {
  main.innerHTML = indexPage;
}

attachCollector();

export default {};
