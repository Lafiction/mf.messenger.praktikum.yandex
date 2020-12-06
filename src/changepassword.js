import { attachCollector } from './formDataCollector.js';

const Handlebars = window['Handlebars'];

const pageContent = `
  <form class="form" action="">
    <div class="avatar">
      <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
    </div>
    <legend>Иван</legend>  
    <fieldset>
      <label>
        Старый пароль
        <input type="text" name="oldPassword">
      </label>
      
      <label>
        Новый пароль
        <input type="text" name="newPassword">
      </label>

      <label>
        Новый пароль
        <input type="text" name="newPassword">
      </label>
      
      <label>
        <input type="submit" value="Сохранить">
      </label>
      
    </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const changepasswordPage = template({});

const main = document.querySelector('.changepasswordPage');

if (main) {
  main.innerHTML = changepasswordPage;
}

attachCollector();

export default {};
