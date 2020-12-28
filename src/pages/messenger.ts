import { Block } from '../common/block.js';
import { ChatPreview } from '../components/chatPreviews.js';
import { Search } from '../components/search.js';
import { ProfileBtn } from '../components/profileBtn.js';
import { Avatar } from '../components/avatar.js';
import { BottomBar } from '../components/bottomBar.js';

const Handlebars = (window as any)['Handlebars'];

export class MessengerPage extends Block<{}> {
  constructor() {
    super('div', {});
  }

  componentDidMount() {
    this.element.classList.add('frame');
    this.element.classList.add('messengerPage');
    this.element.addEventListener('click', function(event: any) {      
      if (event.target) {
        if (event.target.classList.contains('profile__btn')) {
          document.location.href = 'profile';
        };
      };
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
