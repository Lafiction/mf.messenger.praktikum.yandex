import { makeAvatar } from './components/avatar.js';
import { makeProfileBtn } from './components/profileBtn.js';
import { makeSearch } from './components/search.js';
import { makeChatPreview } from './components/chatPreviews.js';
import { makeBottomBar } from './components/bottomBar.js';

const Handlebars = (window as any)['Handlebars'];

const avatar = makeAvatar();
const profileBtn = makeProfileBtn();
const search = makeSearch();
const bottomBar = makeBottomBar();

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

const pageContent = `
  <aside class="sidebar">
    <div class="profile">

      {{{ avatar }}}

      {{{ profileBtn }}}

    </div>

    {{{ search }}}

    <ul class="contacts">
    
      {{{ chatPreviewActive }}}

      {{#each chatPreviews}}
        {{{ this }}}
      {{/each}}
      
    </ul>

    {{{ bottomBar }}}
    
  </aside>
  <div class="change-chat">
    <span>Выберите чат, чтобы отправить сообщение</span>
  </div>
`; 

const template = Handlebars.compile(pageContent);

const messengerPage = template(
  { 
    avatar,  
    profileBtn,
    search, 
    chatPreviews,
    bottomBar
  }
);

const mainDiv = document.querySelector('.messengerPage');

if (mainDiv) {
  mainDiv.innerHTML = messengerPage;
}

export default {};
