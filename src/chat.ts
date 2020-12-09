import { makeMessage } from './components/messages.js';

import { ChatPreview } from './components/chatPreviews.js';
import { Search } from './components/search.js';
import { ProfileBtn } from './components/profileBtn.js';
import { MessageArea } from './components/messageArea.js';
import { ChatProfile } from './components/chatProfile.js';
import { Avatar } from './components/avatar.js';
import { BottomBar } from './components/bottomBar.js';


// говорим компилятору, что handlebars у нас есть
// handlebars подключен в html странице
const Handlebars = (window as any)['Handlebars'];



const searchComponent = new Search();
const search = searchComponent.getContent().outerHTML;

const profileBtnComponent = new ProfileBtn();
const profileBtn = profileBtnComponent.getContent().outerHTML;

const messageAreaComponent = new MessageArea();
const messageArea = messageAreaComponent.getContent().outerHTML;

const chatProfileComponent = new ChatProfile();
const chatProfile = chatProfileComponent.getContent().outerHTML;

const avatarComponent = new Avatar();
const avatar = avatarComponent.getContent().outerHTML;

const bottomBarComponent = new BottomBar();
const bottomBar = bottomBarComponent.getContent().outerHTML;

function generateChatPreviews() {
  const arr = [];
  const activeIndex = Math.floor(Math.random()*10);
  for (let i = 0; i < 10; i++) {
    let active = '';
    if (i === activeIndex) {
      active = 'active';
    } 
    const chatPreviewComponent = new ChatPreview({
      chatPreviewType: active
    });
    const chatPreview = chatPreviewComponent.getContent().outerHTML;
    arr.push(chatPreview);
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
