import { handleOnSubmitForm, getFormData} from '../common/formDataCollector.js';
import { addValidationEventListeners } from '../common/validation.js';
import { Block } from '../common/block.js';
import { TextField } from '../components/textField.js';
import { SubmitBtn } from '../components/submitBtn.js';
import { MessengerAPI, User } from '../common/messengerAPI.js';
import { Router } from '../common/router.js';

const Handlebars = (window as any)['Handlebars'];

export class ChangePasswordPage extends Block<{ avatar: string, fullName: string }> {
  private oldPasswordComponent!: TextField;
  private repeatPasswordComponent!: TextField;
  private newPasswordComponent!: TextField;
  private submitBtnComponent!: SubmitBtn;
  private api!: MessengerAPI;

  constructor() {
    super('main', { avatar: '', fullName: '' });
  }

  init() {
    this.api = new MessengerAPI();
    super.init();
  }

  private onSubmit() {
    const form: any = this.element.querySelector('form');
    const data = getFormData(form);
    if (data.newPassword !== data.repeatPassword) {
      alert('Старый и новый пароли не совпадают');
      return;
    }

    this.api.changePassword(data.oldPassword, data.newPassword).then(() => {
      const router = new Router('router is already created in app.ts');
      alert('Пароль изменен');
      this.api.signOut();
      router.go('/');
    }).catch((error: any) => {
      alert('Ошибка' + error);
      this.api.signOut();
    });
  }
  
  componentDidMount() {
    this.element.classList.add('changePasswordPage');

    this.api.getCurrentUserInfo().then((userData: User) => {
      this.setProps({
        avatar: userData.avatar,
        fullName: userData.first_name + ' ' + userData.second_name
      });
    }).catch((error: any) => {
      console.log('Неизвестная ошибка', error);
    });
    
    this.oldPasswordComponent = new TextField({ 
      fieldType: 'password',
      fieldName: 'oldPassword',
      placeholder: 'Старый пароль'
    });
   
    this.newPasswordComponent = new TextField({ 
      fieldType: 'password',
      fieldName: 'newPassword',
      placeholder: 'Новый пароль'
    });

    this.repeatPasswordComponent = new TextField({ 
      fieldType: 'password',
      fieldName: 'repeatPassword',
      placeholder: 'Повторите пароль'
    });

    this.submitBtnComponent = new SubmitBtn({ value: 'Сохранить' });

    this.oldPasswordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.repeatPasswordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.newPasswordComponent.eventBus().on(TextField.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(TextField.EVENTS.FLOW_RENDER);
    });

    this.submitBtnComponent.eventBus().on(SubmitBtn.EVENTS.FLOW_RENDER, () => {
      this.eventBus().emit(SubmitBtn.EVENTS.FLOW_RENDER);
    });

    handleOnSubmitForm(this.element);

    if (this.element) {
      addValidationEventListeners(this.element, 'oldPassword', /^.{4,}$/i);
      addValidationEventListeners(this.element, 'newPassword', /^.{4,}$/i);
      addValidationEventListeners(this.element, 'repeatPassword', /^.{4,}$/i);
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

    const oldPassword = this.oldPasswordComponent.getContent().outerHTML;
    const newPassword = this.newPasswordComponent.getContent().outerHTML;
    const repeatPassword = this.repeatPasswordComponent.getContent().outerHTML;
    const submitBtn = this.submitBtnComponent.getContent().outerHTML;

    const pageContent = `
      <form class="form" action="#"> 
        <div class="avatar">
          <img class="avatar__img" src="{{ avatarUrl }}">
        </div>
      
        <legend>{{ fullName }}</legend>
        <fieldset>
          
          {{{ oldPassword }}}

          <div class='input-requirements old_password-validation-msg'>
            Длина пароля должна быть не меньше 4 символов.
          </div>
        
          {{{ newPassword }}}

          <div class='input-requirements new_password-validation-msg'>
            Длина пароля должна быть не меньше 4 символов.
          </div>
        
          {{{ repeatPassword }}}

          <div class='input-requirements repeat_password-validation-msg'>
            Длина пароля должна быть не меньше 4 символов.
          </div>
        
          {{{ submitBtn }}}
        
        </fieldset>
      </form>`; 

    const template = Handlebars.compile(pageContent);

    const changePasswordPage = template(
      { 
        avatarUrl, 
        fullName: this.props.fullName, 
        oldPassword,
        newPassword,
        repeatPassword,
        submitBtn
      });

    return changePasswordPage;
  }
}

