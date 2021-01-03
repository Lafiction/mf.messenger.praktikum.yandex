import { Block } from '../common/block.js';
import { ChatPreview } from '../components/chatPreviews.js';
import { Search } from '../components/search.js';
import { ProfileBtn } from '../components/profileBtn.js';
import { Avatar } from '../components/avatar.js';
import { BottomBar } from '../components/bottomBar.js';
import { Message } from '../components/messages.js';
import { MessageArea } from '../components/messageArea.js';
import { ChatProfile } from '../components/chatProfile.js';
import { Router } from '../common/router.js';
import { MessengerAPI, Chat } from '../common/messengerAPI.js';

const Handlebars = (window as any)['Handlebars'];

interface MessengerPageProps {
  chats: Chat[];
  selectedChatId: number | undefined;
}

export class MessengerPage extends Block<MessengerPageProps> {
  private api!: MessengerAPI;

  constructor() {
    const initialProps = {
      chats: [],
      selectedChatId: undefined,
    };
    super('div', initialProps);
  }

  init() {
    this.api = new MessengerAPI();
    super.init();
  }

  private onNewChatClick() {
    const newChatTitle = prompt('Введите название нового чата');

    if (!newChatTitle) {
      return;
    }
    
    this.api.createChat(newChatTitle).then(() => {
      const router = new Router('router is already created in app.ts');
      router.go('/messenger');
    }).catch((error: any) => {
      alert('Ошибка' + error);
    });
  }

  private onAddUserToChat() {
    const newUserId = prompt('Введите ID юзера, которого нужно добавить');

    if (!newUserId) {
      return;
    }

    const userId = parseInt(newUserId, 10);
    if (isNaN(userId)) {
      return;
    }

    if (!this.props.selectedChatId) {
      return;
    }

    this.api.addUsersToChat([ userId ], this.props.selectedChatId).then(() => {
      console.log('Юзер добавлен');
    }).catch((error: any) => {
      alert('Ошибка' + error);
    });
  }

  private onDeleteUserFromChat() {
    const userIdToDelete = prompt('Введите ID юзера, которого хотите удалить');

    if (!userIdToDelete) {
      return;
    }

    const userId = parseInt(userIdToDelete, 10);
    if (isNaN(userId)) {
      return;
    }

    if (!this.props.selectedChatId) {
      return;
    }

    this.api.deleteUsersFromChat([ userId ], this.props.selectedChatId).then(() => {
      console.log('Юзер удален');
    }).catch((error: any) => {
      alert('Ошибка' + error);
    });
  }

  componentDidMount() {
    this.element.classList.add('frame');
    this.element.classList.add('messengerPage');
    this.element.addEventListener('click', (event: any) => {
      if (event.target && event.target.classList.contains('profile__btn')) {
        document.location.href = 'profile';
      };

      if (event.target && event.target.classList.contains('bottombar__btn')) {
        this.onNewChatClick();
      };

      if (event.target && event.target.closest('.chat_preview_item')) {
        const chatItem = event.target.closest('.chat_preview_item');
        this.setProps({ selectedChatId: parseInt(chatItem.id, 10) });
      }

      if (event.target && event.target.classList.contains('add_chat_user')) {
        this.onAddUserToChat();
      };

      if (event.target && event.target.classList.contains('delete_chat_user')) {
        this.onDeleteUserFromChat();
      };
    });

    this.api.getChatsList().then((chatsData: Chat[]) => {
      this.setProps({ chats: chatsData });
    }).catch((error: any) => {
      console.log('Ошибка', error);
    });
  } 

  render() {
    const searchComponent = new Search();
    const search = searchComponent.getContent().outerHTML;

    const profileBtnComponent = new ProfileBtn();
    const profileBtn = profileBtnComponent.getContent().outerHTML;

    const avatarComponent = new Avatar();
    const avatar = avatarComponent.getContent().outerHTML;

    const bottomBarComponent = new BottomBar();
    const bottomBar = bottomBarComponent.getContent().outerHTML;

    const messageAreaComponent = new MessageArea();
    const messageArea = messageAreaComponent.getContent().outerHTML;

    let chatProfile;
    let messages;

    if (this.props.selectedChatId) {
      const selectedChat = this.props.chats.find((chat) => chat.id === this.props.selectedChatId);

      if (selectedChat) {
        const chatProfileComponent = new ChatProfile({
          chatAvatar: selectedChat.avatar,
          chatTitle: selectedChat.title
        });
        chatProfile = chatProfileComponent.getContent().outerHTML;
      }

      messages = this.generateMessages();
    }

    function generateChatPreviews(chats: Chat[], selectedChatId: number | undefined) {
      const arr = [];
      for (let i = 0; i < chats.length; i++) {
        let chatPreviewType = '';
        if (chats[i].id === selectedChatId) {
          chatPreviewType = 'active';
        }
        const chatPreviewComponent = new ChatPreview({
          id: chats[i].id,
          title: chats[i].title, 
          avatar: chats[i].avatar,
          chatPreviewType
        });
        const chatPreview = chatPreviewComponent.getContent().outerHTML;
        arr.push(chatPreview);
      }
      return arr;
    }

    const chatPreviews = generateChatPreviews(this.props.chats, this.props.selectedChatId);

    const pageContent = `
      <aside class='sidebar'>
        <div class='profile'>

          {{{ avatar }}}

          {{{ profileBtn }}}

        </div>

        {{{ search }}}

        <ul class='contacts'>
        
          {{#each chatPreviews}}
            {{{ this }}}
          {{/each}}
          
        </ul>

        {{{ bottomBar }}}
        
      </aside>

      {{#if selectedChat}}

        <div class="chat">

          {{{ chatProfile }}}

          <ul class="messages">

            {{#each messages}}
              {{{ this }}}
            {{/each}}
            
          </ul>

          {{{ messageArea }}}

        </div>

      {{else}}

        <div class='change-chat'>
          <span>Выберите чат, чтобы отправить сообщение</span>
        </div>

      {{/if}}
    `; 

    const template = Handlebars.compile(pageContent);

    const messengerPage = template(
      { 
        avatar,  
        profileBtn,
        search, 
        chatPreviews,
        bottomBar,
        chatProfile,
        messageArea,
        messages,
        selectedChat: !!this.props.selectedChatId
      }
    );

    return messengerPage;
  }

  private generateMessages() {
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
}
