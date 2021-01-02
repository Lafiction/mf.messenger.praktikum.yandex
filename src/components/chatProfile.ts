import { Block } from '../common/block.js';

export class ChatProfile extends Block<{}> {
  constructor() {
    super('div', {});
  }

  componentDidMount() {
    this.element.classList.add('chat__profile');
  }

  render() {
    return `<img class="chat__img" src="http://placekitten.com/50/50" alt="">
            <p class="chat__name">Brennan Stokes</p>
            <div class="chat_user_controls">
              <span class="add_chat_user">+👤</span>
              <span class="delete_chat_user">−👤</span>
            </div>
            `;
  }
}
