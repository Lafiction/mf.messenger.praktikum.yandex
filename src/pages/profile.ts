import { Block } from '../common/block.js';
import { MessengerAPI, User } from '../common/messengerAPI.js';
import { Router } from '../common/router.js';

const Handlebars = (window as any)['Handlebars'];

export class ProfilePage extends Block<User> {
  private api: MessengerAPI;

  constructor() {
    const initialUserData: User = {
      id: 0,
      avatar: '',
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      email: '',
      phone: ''
    };
    super('main', initialUserData);
  }

  init() {
    this.api = new MessengerAPI();
    super.init();
  }

  private onExitBtnClick() {
    this.api.signOut().then((response: any) => {
      if (response.status < 400) {
        const router = new Router('router is already created in app.ts');
        router.go('/');
      } else {
        alert('Ошибка' + response.responseText);
      }
    }).catch((error: any) => {
      console.log('Неизвестная ошибка', error);
    });
  }

  private onAvatarClick() {
    const newAvatarInput = document.createElement('input');
    newAvatarInput.type = 'file';

    newAvatarInput.onchange = (event: any) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append("avatar", image, "image.jpeg");

      this.api.uploadUserAvatar(formData).then((response: any) => {
        if (response.status < 400) {
          alert('Аватар изменен');
          const router = new Router('router is already created in app.ts');
          router.go('/profile');
        } else {
          alert('Ошибка' + response.responseText);
        }
      }).catch((error: any) => {
        console.log('Неизвестная ошибка', error);
      });
    }

    newAvatarInput.click();
  }

  componentDidMount() {
    this.element.classList.add('profilePage');
    this.element.addEventListener('click', (event: any) => {
      if (event.target && event.target.classList.contains('profile-fields__exit')) {
        this.onExitBtnClick();
      };

      if (event.target && event.target.classList.contains('avatar__attach')) {
        event.preventDefault();
        this.onAvatarClick();
      }
    });

    this.api.getCurrentUserInfo().then((response: any) => {
      if (response.status < 400) {
        const userData = JSON.parse(response.responseText);
        this.setProps(userData);
      }
    }).catch((error: any) => {
      console.log('Неизвестная ошибка', error);
    });
  }

  private getAvatar(userData: User) {
    let avatarUrl = 'https://randomuser.me/api/portraits/med/women/21.jpg';
    if (userData.avatar) {
      avatarUrl = 'https://ya-praktikum.tech/' + userData.avatar;
    }
    const avatarTemplate = `
      <div class="avatar">
        <img class="avatar__img" src="{{ avatarUrl }}">
        <input class="avatar__attach" type="file" name="avatar">
      </div>`;
    const template = Handlebars.compile(avatarTemplate);
    const avatar = template({ avatarUrl });

    return avatar;
  }

  private getNameField(userData: User) {
    const nameFieldTemplate = `
      <legend>{{ name }} {{ secondName }}</legend>`;
    const template = Handlebars.compile(nameFieldTemplate);
    const nameField = template({ name: userData.first_name, secondName: userData.second_name });

    return nameField;
  }

  private getFirstNameField(userData: User) {
    const firstNameFieldTemplate = `
      <li class="profile-fields__item">
        <span>Имя</span>
        <span class="profile-fields__content">{{ firstName }}</span>
      </li>`;

    const template = Handlebars.compile(firstNameFieldTemplate);
    const firstNameField = template({ firstName: userData.first_name });

    return firstNameField;
  }

  private getSecondNameField(userData: User) {
    const secondNameFieldTemplate = `
      <li class="profile-fields__item">
        <span>Фамилия</span>
        <span class="profile-fields__content">{{ secondName }}</span>
      </li>`;

    const template = Handlebars.compile(secondNameFieldTemplate);
    const secondNameField = template({ secondName: userData.second_name });

    return secondNameField;
  }

  private getLoginField(userData: User) {
    const loginFieldTemplate = `
      <li class="profile-fields__item">
        <span>Логин</span>
        <span class="profile-fields__content">{{ login }}</span>
      </li>`;

    const template = Handlebars.compile(loginFieldTemplate);
    const loginField = template({ login: userData.login });

    return loginField;
  }

  private getEmailField(userData: User) {
    const emailFieldTemplate = `
      <li class="profile-fields__item">
        <span>Почта</span>
        <span class="profile-fields__content">{{ email }}</span>
      </li>`;

    const template = Handlebars.compile(emailFieldTemplate);
    const emailField = template({ email: userData.email });

    return emailField;
  }

  private getPhoneField(userData: User) {
    const phoneFieldTemplate = `
      <li class="profile-fields__item">
        <span>Телефон</span>
        <span class="profile-fields__content">{{ phone }}</span>
      </li>`;

    const template = Handlebars.compile(phoneFieldTemplate);
    const phoneField = template({ phone: userData.phone });

    return phoneField;
  }

  render() {

    const avatar = this.getAvatar(this.props);
    const nameField = this.getNameField(this.props);
    const firstNameField = this.getFirstNameField(this.props);
    const secondNameField = this.getSecondNameField(this.props);    
    const loginField = this.getLoginField(this.props);
    const emailField = this.getEmailField(this.props);
    const phoneField = this.getPhoneField(this.props);
    const pageContent = `

      {{{ avatar }}}

      {{{ nameField }}}
      
      <ul class="profile-fields">
  
        {{{ firstNameField }}}
        
        {{{ secondNameField }}}

        {{{ loginField }}}

        {{{ emailField }}}
       
        {{{ phoneField }}}
       
        <li class="profile-fields__item">
          <a href="changedata">Изменить данные</a>
        </li>
        
        <li class="profile-fields__item">
          <a href="changepassword">Изменить пароль</a>
        </li>
        
        <li class="profile-fields__item">
          <span class="profile-fields__exit">Выйти</span>
        </li>

      </ul>`;

    const template = Handlebars.compile(pageContent);

    const profilePage = template(
      { 
        avatar,
        nameField,
        firstNameField,
        secondNameField,
        loginField,
        emailField,
        phoneField
      }
    );

    return profilePage;
  }
}
