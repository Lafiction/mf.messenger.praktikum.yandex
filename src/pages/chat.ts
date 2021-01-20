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
import { getSocket } from '../common/web-socket-client.js';

const { Handlebars } = (window as any);

interface MessageDescription {
  text: string;
  incoming: boolean;
}

interface ChatPageProps {
  chats: Chat[];
  selectedChatId: number | undefined;
  currentPath: string;
  messages: MessageDescription[];
}

export class ChatPage extends Block<ChatPageProps> {
  private api!: MessengerAPI;

  private socket: WebSocket | undefined;

  constructor(path: string) {
    super('div', {
      chats: [],
      selectedChatId: undefined,
      currentPath: path,
      messages: [],
    });
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

    this.api.createChat(newChatTitle).then((chatId: number) => {
      const router = new Router('router is already created in app.ts');
      router.go(`/chat/${chatId}`);
    }).catch((error: any) => {
      alert(`Ошибка ${error}`);
    });
  }

  private onAddUserToChat() {
    const newUserId = prompt('Введите ID юзера, которого нужно добавить');

    if (!newUserId) {
      return;
    }

    const userId = parseInt(newUserId, 10);
    if (Number.isNaN(userId)) {
      return;
    }

    if (!this.props.selectedChatId) {
      return;
    }

    this.api.addUsersToChat([userId], this.props.selectedChatId).catch((error: any) => {
      alert(`Ошибка ${error}`);
    });
  }

  private onDeleteUserFromChat() {
    const userIdToDelete = prompt('Введите ID юзера, которого хотите удалить');

    if (!userIdToDelete) {
      return;
    }

    const userId = parseInt(userIdToDelete, 10);
    if (Number.isNaN(userId)) {
      return;
    }

    if (!this.props.selectedChatId) {
      return;
    }

    this.api.deleteUsersFromChat([userId], this.props.selectedChatId).catch((error: any) => {
      alert(`Ошибка ${error}`);
    });
  }

  private onSendMessageClick() {
    const messageTextInput: HTMLInputElement | null = this.element.querySelector('.message-area__input');
    if (messageTextInput && messageTextInput.value && this.socket) {
      this.socket.send(JSON.stringify({
        content: messageTextInput.value,
        type: 'message',
      }));
    }
  }

  componentDidMount() {
    this.element.classList.add('frame');
    this.element.classList.add('messengerPage');
    this.element.addEventListener('click', (event: any) => {
      if (event.target && event.target.classList.contains('profile__btn')) {
        document.location.href = '/profile';
      }

      if (event.target && event.target.classList.contains('add-new-chat__btn')) {
        this.onNewChatClick();
      }

      if (event.target && event.target.closest('.chat_preview_item')) {
        const chatId = event.target.closest('.chat_preview_item').id;
        document.location.href = chatId;
      }

      if (event.target && event.target.classList.contains('add_chat_user')) {
        this.onAddUserToChat();
      }

      if (event.target && event.target.classList.contains('delete_chat_user')) {
        this.onDeleteUserFromChat();
      }

      if (event.target && event.target.classList.contains('message-area__btn')) {
        this.onSendMessageClick();
      }
    });

    this.api.getChatsList().then((chatsData: Chat[]) => {
      const currentChatId = parseInt(this.props.currentPath.slice(6), 10);

      this.api.getCurrentUserInfo()
        .then((currentUserInfo) => {
          return currentUserInfo.id;
        }).then((currentUserId) => {
          this.api.getChatToken(currentChatId).then((chatToken: string) => {
            getSocket(currentUserId, currentChatId, chatToken).then((socket) => {
              this.socket = socket;

              this.socket.addEventListener('message', (event) => {
                const messageData = JSON.parse(event.data);
                console.log('Получены данные', messageData);

                if (messageData.type === 'message') {
                  const updatedMessages = [
                    ...this.props.messages,
                    {
                      text: messageData.content,
                      incoming: false,
                    },
                  ];
                  this.setProps({ messages: updatedMessages });
                }
              });
            });
          });
        });

      this.setProps({
        chats: chatsData,
        selectedChatId: currentChatId,
        messages: [
          {
            text: 'сообщение1',
            incoming: true,
          },
          {
            text: 'сообщение2',
            incoming: false,
          },
          {
            text: 'сообщение333',
            incoming: true,
          },
          {
            text: 'сообщение331113',
            incoming: false,
          },
          {
            text: 'сообщение2222333',
            incoming: true,
          },
          {
            text: 'сообщение33343435',
            incoming: true,
          },
          {
            text: 'сообщение35',
            incoming: true,
          },
        ],
      });
    }).catch((error: any) => {
      console.log('Ошибка', error);
    });
  }

  render() {
    const searchComponent = new Search();
    const search = searchComponent.getOuterHTML();

    const profileBtnComponent = new ProfileBtn();
    const profileBtn = profileBtnComponent.getOuterHTML();

    const avatarComponent = new Avatar();
    const avatar = avatarComponent.getOuterHTML();

    const bottomBarComponent = new BottomBar();
    const bottomBar = bottomBarComponent.getOuterHTML();

    const messageAreaComponent = new MessageArea();
    const messageArea = messageAreaComponent.getOuterHTML();

    let chatProfile;
    let messages;

    if (this.props.selectedChatId) {
      const selectedChat = this.props.chats.find((chat) => {
        return chat.id === this.props.selectedChatId;
      });

      if (selectedChat) {
        const chatProfileComponent = new ChatProfile({
          chatAvatar: selectedChat.avatar,
          chatTitle: selectedChat.title,
        });
        chatProfile = chatProfileComponent.getOuterHTML();
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
          chatPreviewType,
        });
        const chatPreview = chatPreviewComponent.getOuterHTML();
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

        <ul class='chats'>
        
          {{#each chatPreviews}}
            {{{ this }}}
          {{/each}}
          
        </ul>

        {{{ bottomBar }}}
        
      </aside>

      {{#if selectedChat}}

        <div class="chat">

          {{{ chatProfile }}}

          <div class="messages-wrapper">
            <ul class="messages">

              {{#each messages}}
                {{{ this }}}
              {{/each}}
              
            </ul>
          </div>
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
        selectedChat: !!this.props.selectedChatId,
      },
    );

    return messengerPage;
  }

  private generateMessages() {
    const arr = [];

    for (let i = 0; i < this.props.messages.length; i++) {
      let messageType = 'outgoing';

      if (this.props.messages[i].incoming) {
        messageType = 'incoming';
      }

      const messageComponent = new Message({
        messageType,
        messageText: this.props.messages[i].text,
      });

      const message = messageComponent.getOuterHTML();
      arr.push(message);
    }
    return arr;
  }
}
