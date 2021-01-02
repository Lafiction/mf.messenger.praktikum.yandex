import { Block } from '../common/block.js';
import { ChatPreview } from '../components/chatPreviews.js';
import { Search } from '../components/search.js';
import { ProfileBtn } from '../components/profileBtn.js';
import { Avatar } from '../components/avatar.js';
import { BottomBar } from '../components/bottomBar.js';
import { Router } from '../common/router.js';
import { MessengerAPI, Chat } from '../common/messengerAPI.js';

const Handlebars = (window as any)['Handlebars'];

interface MessengerPageProps {
  chats: Chat[];
  selectedChatId: number | undefined;
}

export class MessengerPage extends Block<MessengerPageProps> {
  private api: MessengerAPI;

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
    
    this.api.createChat(newChatTitle).then((response: any) => {
      if (response.status < 400) {
        console.log('Чат создан', response.responseText);
        const router = new Router('router is already created in app.ts');
        router.go('/messenger');
      } else {
        alert('Ошибка' + response.responseText);
      }
    }).catch((error: any) => {
      console.log('Неизвестная ошибка', error);
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
    });

    this.api.getChatsList().then((response: any) => {
      if (response.status < 400) {
        const chatsData = JSON.parse(response.responseText);
        this.setProps({ chats: chatsData });
      }
    }).catch((error: any) => {
      console.log('Неизвестная ошибка', error);
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
        bottomBar
      }
    );

    return messengerPage;
  }
}
