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

const messageArea = `
  <div class="message-area">
    <div class="message-area__wrap">
      <span class="message-area__attachment">📎</span>
      <input class="message-area__input" type="text" placeholder="Write a message..." name="message">
      <button class="message-area__btn">⬆️</button>
    </div>
  </div>
`;

function makeChatPreview(active: boolean): string {
  let chatPreviewType;

  const chatPreviewContent = `
  <li class="contacts__item {{ chatPreviewType }}">
    <div class="wrap">
      <img src="http://placekitten.com/50/50" alt="">
      <div class="meta">
        <p class="name">Lincoln Williamson</p>
        <p class="preview">Sed ut perspiciatis unde omnis riam.</p>
      </div>
    </div>
  </li>`;

  if (active) {
    chatPreviewType = 'active';
  } else {
    chatPreviewType = '';
  } 

  const chatPreviewTemplate = Handlebars.compile(chatPreviewContent);
  
  const chatPreview = chatPreviewTemplate({
    chatPreviewType,
  });

  return chatPreview;
}

function generateChatPreviews() {
  const arr = [];
  const activeIndex = Math.floor(Math.random()*10);
  for (let i = 0; i < 10; i++) {
    if (i === activeIndex) {
      arr.push(makeChatPreview(true));
    } else {
      arr.push(makeChatPreview(false));
    } 
  }
  return arr;
}

const chatPreviews = generateChatPreviews();

function makeMessage(sent: boolean): string {
  let messageType;
  let text;

  const messageContent = `
    <li class="messages__item {{ messageType }}">
      <img class="messages__img" src="http://placekitten.com/50/50" alt="">
      <p class="messages__text">{{ text }}</p>
    </li>
  `;

  if (sent) {
    messageType = 'sent';
    text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui';
  } else {
    messageType = 'replies';
    text = 'Et harum quidem rerum facilis est et expedita distinctio.';
  }

  const messageTemplate = Handlebars.compile(messageContent);

  const message = messageTemplate({
    messageType,
    text
  });

  return message;
}

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
