import * as Handlebars from 'handlebars';
import { Block } from '../common/block';
import { ChatPreview } from '../components/chatPreviews';
import { Search } from '../components/search';
import { ProfileBtn } from '../components/profileBtn';
import { Avatar } from '../components/avatar';
import { BottomBar } from '../components/bottomBar';
import { Router } from '../common/router';
import { MessengerAPI, Chat } from '../common/messengerAPI';

interface MessengerPageProps {
  chats: Chat[];
}

export class MessengerPage extends Block<MessengerPageProps> {
  private api!: MessengerAPI;

  constructor() {
    super('div', {
      chats: [],
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
    }).catch((error: Error) => {
      alert(`Ошибка ${error}`);
    });
  }

  componentDidMount() {
    this.element.classList.add('frame');
    this.element.classList.add('messengerPage');
    this.element.addEventListener('click', (event: any) => {
      if (event.target && event.target.classList.contains('profile__btn')) {
        document.location.href = 'profile';
      }

      if (event.target && event.target.classList.contains('add-new-chat__btn')) {
        this.onNewChatClick();
      }

      if (event.target && event.target.closest('.chat_preview_item')) {
        const chatId = event.target.closest('.chat_preview_item').id;
        document.location.href = `chat/${chatId}`;
      }
    });

    this.api.getChatsList().then((chatsData: Chat[]) => {
      this.setProps({ chats: chatsData });
    }).catch((error: Error) => {
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

    function generateChatPreviews(chats: Chat[]) {
      const arr = [];
      for (let i = 0; i < chats.length; i++) {
        const chatPreviewType = '';
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

    const chatPreviews = generateChatPreviews(this.props.chats);

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

      <div class='change-chat'>
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
        bottomBar,
      },
    );

    return messengerPage;
  }
}
