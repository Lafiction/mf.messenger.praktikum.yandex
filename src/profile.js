const Handlebars = window['Handlebars'];

const pageContent = `
  <div class="avatar">
    <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
    <input class="avatar__attach" type="file" name="avatar">
  </div>
  <legend>Иван</legend>  
  <ul class="profile-fields">
    <li class="profile-fields__item">
      <span>Почта</span>
      <span class="profile-fields__content">pochta@yandex.ru</span>
    </li>
    <hr>
    <li class="profile-fields__item">
      <span>Логин</span>
      <span class="profile-fields__content">ivanivanov</span>
    </li>
    <hr>
    <li class="profile-fields__item">
      <span>Имя</span>
      <span class="profile-fields__content">Иван</span>
    </li>
    <hr>
    <li class="profile-fields__item">
      <span>Фамилия</span>
      <span class="profile-fields__content">Иванов</span>
    </li>
    <hr>
    <li class="profile-fields__item">
      <span>Ник</span>
      <span class="profile-fields__content">IvanI</span>
    </li>
    <hr>
    <li class="profile-fields__item">
      <span>Телефон</span>
      <span class="profile-fields__content">+7 (909) 999 00 00</span>
    </li>
    <li class="profile-fields__item">
      <a href="">Изменить данные</a>
    </li>
    <hr>
    <li class="profile-fields__item">
      <a href="">Изменить пароль</a>
    </li>
    <hr>
    <li class="profile-fields__item">
      <span class="profile-fields__exit">Выйти</span>
    </li>
  </ul>          
`; 

const template = Handlebars.compile(pageContent);

const profilePage = template({});

const main = document.querySelector('.profilePage');

if (main) {
  main.innerHTML = profilePage;
}

export default {};
