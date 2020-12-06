import { attachCollector } from './formDataCollector.js';

const Handlebars = window['Handlebars'];

const pageContent = `
  <form class="form" action="#">
    <div class="avatar">
      <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
    </div>
    <legend>Иван</legend>  
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
        <input type="submit" value="Сохранить">
      </label>
    </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const changedataPage = template({});

const main = document.querySelector('.changedataPage');

if (main) {
  main.innerHTML = changedataPage;
}

attachCollector();

export default {};
