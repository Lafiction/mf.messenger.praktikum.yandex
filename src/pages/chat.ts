import { Block } from '../common/block.js';
import { Message } from '../components/messages.js';
import { ChatPreview } from '../components/chatPreviews.js';
import { Search } from '../components/search.js';
import { ProfileBtn } from '../components/profileBtn.js';
import { MessageArea } from '../components/messageArea.js';
import { ChatProfile } from '../components/chatProfile.js';
import { Avatar } from '../components/avatar.js';
import { BottomBar } from '../components/bottomBar.js';

// говорим компилятору, что handlebars у нас есть
// handlebars подключен в html странице
const Handlebars = (window as any)['Handlebars'];

export class ChatPage extends Block<{}> {
  constructor() {
    super('div', {});
  }

  componentDidMount() {
    this.element.classList.add('frame');
    this.element.classList.add('chatPage');
  }
  
  render() {
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
        let messageType;
        let messageText;
        const sent = Math.random() < 0.5;
        if (sent) {
          messageType = 'sent';
          messageText = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui';
        } else {
          messageType = 'replies';
          messageText = 'Et harum quidem rerum facilis est et expedita distinctio.';
        }

        const messageComponent = new Message({
          messageType: messageType,
          messageText: messageText
        });
        const message = messageComponent.getContent().outerHTML;
        arr.push(message);

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

      </div>`; 

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

    return chatPage;
  }
}
