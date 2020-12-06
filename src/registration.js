import { attachCollector } from './formDataCollector.js';

const Handlebars = window['Handlebars'];

const pageContent = `
  <form class="form" action="#">
    <legend>Регистрация</legend>  
    <fieldset>
      <label>
        Имя
        <input type="text" name="first_name">
      </label>
      <label>
        Фамилия 
        <input type="text" name="second_name">
      </label>
      <label>
        Логин
        <input type="text" name="display_name">
      </label>
      <label>
        Почта
        <input type="email" name="email" required>
      </label>
      <label>
        Телефон
        <input type="tel" name="phone">
      </label>
      <label>
        Пароль
        <input type="text" name="password">
      </label>
      <label>
        Подтвердите пароль
        <input type="text" name="password">
      </label>
      <label>
        <input type="submit" value="Зарегистрироваться">
      </label>
      <p class="registration">Войти</p>
    </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const registrationPage = template({});

const main = document.querySelector('.registrationPage');

if (main) {
  main.innerHTML = registrationPage;
}

attachCollector();

export default {};
