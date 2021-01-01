import { Block } from '../common/block.js';
import { ChatPreview } from '../components/chatPreviews.js';
import { Search } from '../components/search.js';
import { ProfileBtn } from '../components/profileBtn.js';
import { Avatar } from '../components/avatar.js';
import { BottomBar } from '../components/bottomBar.js';
import { Router } from '../common/router.js';
import { MessengerAPI, Chat } from '../common/messengerAPI.js';

const Handlebars = (window as any)['Handlebars'];

export class MessengerPage extends Block<Chat[]> {
  private api: MessengerAPI;

  constructor() {
    super('div', []);
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
    });

    this.api.getChatsList().then((response: any) => {
      if (response.status < 400) {
        const chatData = JSON.parse(response.responseText);
        this.setProps(chatData);
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

    function generateChatPreviews(chats: Chat[]) {
      const arr = [];
      for (let i = 0; i < chats.length; i++) {        
        const chatPreviewComponent = new ChatPreview({
          id: chats[i].id,
          title: chats[i].title, 
          avatar: chats[i].avatar,
          chatPreviewType: ''
        });
        const chatPreview = chatPreviewComponent.getContent().outerHTML;
        arr.push(chatPreview);
      }
      return arr;
    }
    const chatPreviews = generateChatPreviews(this.props);

    const pageContent = `
      <aside class='sidebar'>
        <div class='profile'>

          {{{ avatar }}}

          {{{ profileBtn }}}

        </div>

        {{{ search }}}

        <ul class='contacts'>
        
          {{{ chatPreviewActive }}}

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
