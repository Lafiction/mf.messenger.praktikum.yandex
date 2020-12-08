import { makeAvatar } from './components/avatar.js';
import { makeProfileBtn } from './components/profileBtn.js';
import { makeSearch } from './components/search.js';
import { makeChatPreview } from './components/chatPreviews.js';
import { makeBottomBar } from './components/bottomBar.js';
import { makeChatProfile } from './components/chatProfile.js';
import { makeMessage } from './components/messages.js';
import { makeMessageArea } from './components/messageArea.js';


// говорим компилятору, что handlebars у нас есть
// handlebars подключен в html странице
const Handlebars = (window as any)['Handlebars'];

const avatar = makeAvatar();
const profileBtn = makeProfileBtn();
const search = makeSearch();
const bottomBar = makeBottomBar();
const chatProfile = makeChatProfile();
const messageArea = makeMessageArea();

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

      {{{ avatar }}}

      {{{ profileBtn }}}

    </div>
    
    {{{ search }}}

    <ul class="contacts">

      {{#each chatPreviews}}
        {{{ this }}}
      {{/each}}

    </ul>

    {{{ bottomBar }}}

  </aside>
  <div class="chat">
  
    {{{ chatProfile }}}

    <ul class="messages">

      {{#each messages}}
        {{{ this }}}
      {{/each}}
      
    </ul>

    {{{ messageArea }}}

  </div>
`; 

const template = Handlebars.compile(pageContent);

const chatPage = template({ 
  avatar,  
  profileBtn,
  search, 
  chatPreviews,
  bottomBar,
  chatProfile,
  messages,
  messageArea
});

const mainDiv = document.querySelector('.chatPage');

if (mainDiv) {
  mainDiv.innerHTML = chatPage;
}

export default {};
