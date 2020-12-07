import { attachCollector } from './formDataCollector.js';

const Handlebars = (window as any)['Handlebars'];

const avatar = `
  <div class="avatar">
    <img class="avatar__img" src="https://randomuser.me/api/portraits/med/women/21.jpg">
  </div>
`;

const oldPassword = `<input type="text" name="Старый пароль">`;

const newPassword = `<input type="text" name="Новый пароль">`;

const repeatPassword = `<input type="text" name="Повторите пароль">`;

const submitField = `<input type="submit" value="Сохранить">`;

const pageContent = `
  <form class="form" action="">
    <!-- avatar -->
      {{{ avatar }}}
    <!-- end avatar -->
    <legend>Иван</legend>
    <fieldset>
      <!-- old password field -->
        {{{ oldPassword }}}
      <!-- end old password field -->
      <!-- new password field -->
        {{{ newPassword }}}
      <!-- end new password field -->
      <!-- new password field -->
        {{{ repeatPassword }}}
      <!-- end new password field -->
      <!-- submit field -->
        {{{ submitField }}}
      <!-- end submit field -->
    </fieldset>
  </form>
`; 

const template = Handlebars.compile(pageContent);

const changePasswordPage = template(
  { 
    avatar,  
    oldPassword,
    newPassword,
    repeatPassword,
    submitField
  }
);

const main = document.querySelector('.changepasswordPage');

if (main) {
  main.innerHTML = changePasswordPage;
}

attachCollector();

export default {};
