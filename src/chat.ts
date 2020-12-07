const Handlebars = (window as any)['Handlebars'];

const avatar = `
  <img class="profile__img" src="http://placekitten.com/50/50" alt="">
`;

const profileBtn = `
  <button class="profile__btn">⚙️<span>Профиль</span></button>
`;

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

const chatProfile = `
  <div class="chat__profile">
    <img class="chat__img" src="http://placekitten.com/50/50" alt="">
    <p class="chat__name">Brennan Stokes</p>
  </div>
`;

const messageSent = `
  <li class="messages__item sent">
    <img class="messages__img" src="http://placekitten.com/50/50" alt="">
     <p class="messages__text">At vero eos et accusamus et iusto odio dignissimos ducimus qui.</p>
  </li>
`;

const messageReplies = `
  <li class="messages__item replies">
    <img class="messages__img" src="http://placekitten.com/50/50" alt="">
    <p class="messages__text">Et harum quidem rerum facilis est et expedita distinctio.</p>
  </li>
`;

const messageArea = `
  <div class="message-area">
    <div class="message-area__wrap">
      <span class="message-area__attachment">📎</span>
      <input class="message-area__input" type="text" placeholder="Write a message..." name="message">
      <button class="message-area__btn">⬆️</button>
    </div>
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
  <div class="chat">
    <!-- chat profile -->
      {{{ chatProfile }}}
    <!-- end chat profile -->
    <ul class="messages">
      <!-- message -->
        {{{ messageSent }}}
      <!-- end message -->
      <!-- message -->
        {{{ messageReplies }}}
      <!-- end message -->
      <!-- message -->
        {{{ messageReplies }}}
      <!-- end message -->
      <!-- message -->
        {{{ messageSent }}}
      <!-- end message -->
      <!-- message -->
        {{{ messageReplies }}}
      <!-- end message -->
      <!-- message -->
        {{{ messageReplies }}}
      <!-- end message -->
      <!-- message -->
        {{{ messageSent }}}
      <!-- end message -->
      <!-- message -->
        {{{ messageSent }}}
      <!-- end message -->
    </ul>
    <!-- message area -->
      {{{ messageArea }}}
    <!-- end message area -->
  </div>
`; 

const template = Handlebars.compile(pageContent);

const chatPage = template(
  { 
    avatar,  
    profileBtn,
    search, 
    chatPreviews: [chatPreview, chatPreview, chatPreview, chatPreview, chatPreview, chatPreview],
    chatPreviewActive,
    bottombar,
    chatProfile,
    messageSent,
    messageReplies,
    messageArea
  }
);

const mainDiv = document.querySelector('.chatPage');

if (mainDiv) {
  mainDiv.innerHTML = chatPage;
}

export default {};
