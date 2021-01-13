import { handleOnSubmitForm, getFormData } from '../common/formDataCollector.js';
import { addValidationEventListeners } from '../common/validation.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';
import { MessengerAPI, User } from '../common/messengerAPI.js';
import { Router } from '../common/router.js';

const Handlebars = (window as any)['Handlebars'];

export class ChangeDataPage extends Block<{ avatar: string, fullName: string }> {
  private nameFieldComponent!: TextField;
  private lastNameFieldComponent!: TextField;
  private displayNameFieldComponent!: TextField;
  private loginFieldComponent!: TextField;
  private emailFieldComponent!: TextField;
  private phoneFieldComponent!: TextField;
  private submitBtnComponent!: SubmitBtn;
  private api!: MessengerAPI;
  private path: string = '';

  constructor(path: string) {
    super('main', { avatar: '', fullName: '' });
    this.path = path;
    console.log(this.path);
  }

  init() {
    this.api = new MessengerAPI();
    super.init();
  }

  private onSubmit() {
    const form: any = this.element.querySelector('form');
    const data = getFormData(form);
    this.api.changeUserProfile(data).then(() => {
      const router = new Router('router is already created in app.ts');
      alert('Данные изменены');
      router.go('/profile');
    }).catch((error: any) => {
      console.log('Ошибка', error);
    });
  }

  private setUserInfo(userData: User) {
    this.nameFieldComponent.setProps({ value: userData.first_name });
    this.lastNameFieldComponent.setProps({ value: userData.second_name });
    this.displayNameFieldComponent.setProps({ value: userData.display_name });
    this.loginFieldComponent.setProps({ value: userData.login });
    this.emailFieldComponent.setProps({ value: userData.email });
    this.phoneFieldComponent.setProps({ value: userData.phone });
    this.setProps({
      avatar: userData.avatar,
      fullName: userData.first_name + ' ' + userData.second_name
    });
  }

  componentDidMount() {
    this.element.classList.add('changeDataPage');

    this.api.getCurrentUserInfo().then((userData: User) => {
      this.setUserInfo(userData);
    }).catch((error: any) => {
      console.log('Ошибка', error);
    });
    
    this.nameFieldComponent = new TextField({ 
      fieldType: 'text',
      fieldName: 'first_name',
      placeholder: 'Имя'
    });

    this.lastNameFieldComponent = new TextField({ 
      fieldType: 'text',
      fieldName: 'second_name',
      placeholder: 'Фамилия'
    });

    this.displayNameFieldComponent = new TextField({ 
      fieldType: 'text',
      fieldName: 'display_name',
      placeholder: 'Отображаемое имя'
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

    this.displayNameFieldComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
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

    handleOnSubmitForm(this.element);

    if (this.element) {
      addValidationEventListeners(this.element, 'login', /^[a-zа-я0-9_]+$/i);
    }

    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit();
    }); 
  }

  render() {
    let avatarUrl = 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png';
    if (this.props.avatar) {
      avatarUrl = 'https://ya-praktikum.tech/' + this.props.avatar;
    }

    const nameFieldHTML = this.nameFieldComponent.getOuterHTML();
    const lastNameFieldHTML = this.lastNameFieldComponent.getOuterHTML();
    const displayNameFieldHTML = this.displayNameFieldComponent.getOuterHTML();
    const loginFieldHTML = this.loginFieldComponent.getOuterHTML();
    const emailFieldHTML = this.emailFieldComponent.getOuterHTML();
    const phoneFieldHTML = this.phoneFieldComponent.getOuterHTML();
    const submitBtnHTML = this.submitBtnComponent.getOuterHTML();

    const pageContent = `
      <form class="form" action="#">  
        <div class="avatar">
          <img class="avatar__img" src="{{ avatarUrl }}">
        </div>
        
        <legend>{{ fullName }}</legend>
        <fieldset>
          
          {{{ nameFieldHTML }}}
        
          {{{ lastNameFieldHTML }}}

          {{{ displayNameFieldHTML }}}
        
          {{{ loginFieldHTML }}}

          <div class='input-requirements login-validation-msg'>
            Логин должен состоять только из букв, цифр и знаков '_'.
          </div>
        
          {{{ emailFieldHTML }}}
        
          {{{ phoneFieldHTML }}}
        
          {{{ submitBtnHTML }}}
          
        </fieldset>
       </form>`;

    const template = Handlebars.compile(pageContent);

    const changeDataPage = template(
      { 
        avatarUrl,
        fullName: this.props.fullName,
        nameFieldHTML,
        lastNameFieldHTML,
        displayNameFieldHTML,
        loginFieldHTML,
        emailFieldHTML,
        phoneFieldHTML,
        submitBtnHTML
      }
    );

    return changeDataPage;
  }
}
