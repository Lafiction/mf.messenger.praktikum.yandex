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

function makeMessage(sent: boolean): string {
  let messageType;
  let text;

  if (sent) {
    messageType = 'sent';
    text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui';
  } else {
    messageType = 'replies';
    text = 'Et harum quidem rerum facilis est et expedita distinctio.';
  }

  const messageContent = `
    <li class="messages__item {{ messageType }}">
      <img class="messages__img" src="http://placekitten.com/50/50" alt="">
      <p class="messages__text">{{ text }}</p>
    </li>
  `;

  const messageTemplate = Handlebars.compile(messageContent);

  const message = messageTemplate({
    messageType,
    text
  });

  return message;
}

const messageArea = `
  <div class="message-area">
    <div class="message-area__wrap">
      <span class="message-area__attachment">📎</span>
      <input class="message-area__input" type="text" placeholder="Write a message..." name="message">
      <button class="message-area__btn">⬆️</button>
    </div>
  </div>
`;

const chatPreviews = [chatPreview, chatPreview, chatPreview, chatPreview, chatPreview, chatPreview];

function generateMessages() {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(makeMessage(Math.random() < 0.5));
  }
  return arr;
}

const messages = generateMessages();

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

      {{#each messages}}
        {{{ this }}}
      {{/each}}
      
    </ul>
    <!-- message area -->
      {{{ messageArea }}}
    <!-- end message area -->
  </div>
`; 

const template = Handlebars.compile(pageContent);

const chatPage = template({ 
  avatar,  
  profileBtn,
  search, 
  chatPreviews,
  chatPreviewActive,
  bottombar,
  chatProfile,
  messages,
  messageArea
});

const mainDiv = document.querySelector('.chatPage');

if (mainDiv) {
  mainDiv.innerHTML = chatPage;
}

export default {};
