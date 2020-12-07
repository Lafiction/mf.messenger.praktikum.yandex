const Handlebars = (window as any)['Handlebars'];

const avatar = `<img class="profile__img" src="http://placekitten.com/50/50" alt="">`;

const profileBtn = `<button class="profile__btn">⚙️<span>Профиль</span></button>`;

const search = `
  <div class="search">
    <label class="search__label" for="">🔍</label>
    <input class="search__input" type="text" placeholder="Search contacts...">
  </div>
`;

const chatPreview = `
  <li class="contacts__item">
    <div class="wrap">
      <img src="http://placekitten.com/50/50" alt="">
      <div class="meta">
        <p class="name">Lincoln Williamson</p>
        <p class="preview">Sed ut perspiciatis unde omnis riam.</p>
      </div>
    </div>
  </li>
`;

const chatPreviewActive = `
  <li class="contacts__item active">
    <div class="wrap">
      <img src="http://placekitten.com/50/50" alt="">
      <div class="meta">
        <p class="name">Lincoln Williamson</p>
        <p class="preview">Sed ut perspiciatis unde omnis riam.</p>
      </div>
    </div>
  </li>
`;

const bottombar = `
  <div class="bottombar">
    <button class="bottombar__btn">➕ <span>Add contact</span></button>
  </div>
`;

const pageContent = `
  <aside class="sidebar">
  <div class="profile">
    <!-- profile img -->
      {{{ avatar }}}
    <!-- end profile img -->
    <!-- profile btn -->
      {{{ profileBtn }}}
    <!-- end profile btn -->
  </div>
  <!-- search -->
    {{{ search }}}
  <!-- end search -->
  <ul class="contacts">
  
    {{{ chatPreviewActive }}}

    {{#each chatPreviews}}
      {{{ this }}}
    {{/each}}
    
  </ul>
  <!-- bottombar -->
    {{{ bottombar }}}
  <!-- end bottombar -->
  </aside>
  <!-- change chat -->
  <div class="change-chat">
  <span>Выберите чат, чтобы отправить сообщение</span>
  </div>
  <!-- end change chat -->
`; 

const template = Handlebars.compile(pageContent);

const messengerPage = template(
  { 
    avatar,  
    profileBtn,
    search, 
    chatPreviews: [chatPreview, chatPreview, chatPreview, chatPreview, chatPreview, chatPreview],
    chatPreviewActive,
    bottombar
  }
);

const mainDiv = document.querySelector('.messengerPage');

if (mainDiv) {
  mainDiv.innerHTML = messengerPage;
}

export default {};
