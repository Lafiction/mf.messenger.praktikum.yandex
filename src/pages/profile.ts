import * as Handlebars from 'handlebars';
import { Block } from '../common/block';
import { MessengerAPI, User } from '../common/messengerAPI';
import { Router } from '../common/router';

export class ProfilePage extends Block<User> {
  private api!: MessengerAPI;

  constructor() {
    super('main', {
      id: 0,
      avatar: '',
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      email: '',
      phone: '',
    });
  }

  init() {
    this.api = new MessengerAPI();
    super.init();
  }

  private onExitBtnClick() {
    this.api.signOut().then(() => {
      const router = new Router('router is already created in app.ts');
      router.go('/');
    }).catch((error: Error) => {
      console.log('Ошибка', error);
    });
  }

  private onAvatarClick() {
    const newAvatarInput = document.createElement('input');
    newAvatarInput.type = 'file';

    newAvatarInput.onchange = (event: any) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar', image, 'image.jpeg');

      this.api.uploadUserAvatar(formData).then(() => {
        alert('Аватар изменен');
        const router = new Router('router is already created in app.ts');
        router.go('/profile');
      }).catch((error: Error) => {
        alert(`Ошибка ${error}`);
      });
    };

    newAvatarInput.click();
  }

  componentDidMount() {
    this.element.classList.add('profilePage');
    this.element.addEventListener('click', (event: any) => {
      if (event.target && event.target.classList.contains('profile-fields__exit')) {
        this.onExitBtnClick();
      }

      if (event.target && event.target.classList.contains('avatar__attach')) {
        event.preventDefault();
        this.onAvatarClick();
      }
    });

    this.api.getCurrentUserInfo().then((userData: User) => {
      this.setProps(userData);
    }).catch((error: Error) => {
      console.log('Ошибка', error);
    });
  }

  private getAvatar(userData: User) {
    let avatarUrl = 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png';
    if (userData.avatar) {
      avatarUrl = `https://ya-praktikum.tech/${userData.avatar}?rand=${Math.round(Math.random() * 100500)}`;
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
        phoneField,
      },
    );

    return profilePage;
  }
}
