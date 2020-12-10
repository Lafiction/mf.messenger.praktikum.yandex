import { attachCollector } from '../common/formDataCollector.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';

const Handlebars = (window as any)['Handlebars'];

class IndexPage extends Block {
  private loginFieldComponent: TextField;
  private passwordFieldComponent: TextField;
  private submitBtnComponent: SubmitBtn;

  constructor() {
    super("form");
  }

  componentDidMount() {
    console.log('IndexPage.componentDidMount');
    this.loginFieldComponent = new TextField({ 
      fieldType: 'text',
      fieldName: 'login',
      placeholder: 'Логин',
      required: true
    });

    this.passwordFieldComponent = new TextField({ 
      fieldType: 'text',
      fieldName: 'password',
      placeholder: 'Пароль',
      required: true
    });

    this.submitBtnComponent = new SubmitBtn({ value: 'Авторизоваться' });

    this.loginFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      console.log('on loginFieldComponent.render');
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });
        
    this.passwordFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      console.log('on passwordFieldComponent.render');
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.submitBtnComponent.eventBus().on(SubmitBtn.EVENTS.FLOW_RENDER, () => {
      console.log('on submitBtnComponent.render');
      this.eventBus().emit(SubmitBtn.EVENTS.FLOW_RENDER);
    });

    attachCollector(this.element as HTMLFormElement);
  }

  render() {
    console.log('IndexPage.render');
    this.element.classList.add('form');
    this.element.setAttribute('action', '#');
    
    const loginField = this.loginFieldComponent.getContent().outerHTML;
    const passwordField = this.passwordFieldComponent.getContent().outerHTML;    
    const submitBtn = this.submitBtnComponent.getContent().outerHTML;

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

const main = document.querySelector('.indexPage');

if (main) {
  main.appendChild(indexPageComponent.getContent());
}



export default {};
