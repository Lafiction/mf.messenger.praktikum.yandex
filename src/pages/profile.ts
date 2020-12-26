import { Block } from '../common/block.js';

const Handlebars = (window as any)['Handlebars'];

export class ProfilePage extends Block<{}> {

  constructor() {
    super('main', {});
  }

  componentDidMount() {
    this.element.classList.add('profilePage');
  }

  render() {

    const avatar = `
      <div class="avatar">
        <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
        <input class="avatar__attach" type="file" name="avatar">
      </div>`;

    const emailField = `
      <li class="profile-fields__item">
        <span>Почта</span>
        <span class="profile-fields__content">pochta@yandex.ru</span>
      </li>`;

    const loginField = `
      <li class="profile-fields__item">
        <span>Логин</span>
        <span class="profile-fields__content">ivanivanov</span>
      </li>`;

    const nameField = `
      <li class="profile-fields__item">
        <span>Имя</span>
        <span class="profile-fields__content">Иван</span>
      </li>`;

    const lastNameField = `
      <li class="profile-fields__item">
        <span>Фамилия</span>
        <span class="profile-fields__content">Иванов</span>
      </li>`;

    const phoneField = `
      <li class="profile-fields__item">
        <span>Телефон</span>
        <span class="profile-fields__content">+7 (909) 999 00 00</span>
      </li>`;

    const pageContent = `

      <!-- profile description -->
        {{{ avatar }}}
      <legend>Иван</legend>
      <!-- end profile description -->
      <ul class="profile-fields">
        <!-- email profile field -->
          {{{ emailField }}}
        <!-- end email profile field -->
        <hr>
        <!-- login profile field -->
          {{{ loginField }}}
        <!-- end login profile field -->
        <hr>
        <!-- profile field -->
          {{{ nameField }}}
        <!-- end profile field -->
        <hr>
        <!-- profile field -->
          {{{ lastNameField }}}
        <!-- end profile field -->
        <hr>
        <!-- profile field -->
          {{{ phoneField }}}
        <!-- end profile field -->
        <!-- profile field -->
        <li class="profile-fields__item">
          <a href="changedata">Изменить данные</a>
        </li>
        <!-- end profile field -->
        <hr>
        <!-- profile field -->
        <li class="profile-fields__item">
          <a href="changepassword">Изменить пароль</a>
        </li>
        <!-- end profile field -->
        <hr>
        <!-- profile field -->
        <li class="profile-fields__item">
          <span class="profile-fields__exit">Выйти</span>
        </li>
        <!-- end profile field -->
      </ul>`;

    const template = Handlebars.compile(pageContent);

    const profilePage = template(
      { 
        avatar,  
        emailField,
        loginField,
        nameField,
        lastNameField,
        phoneField
      }
    );

    return profilePage;
  }
}
