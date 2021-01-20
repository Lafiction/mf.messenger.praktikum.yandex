import * as Handlebars from 'handlebars';
import { Block } from '../common/block';

interface ChatProfileProps {
  chatAvatar?: string;
  chatTitle?: string;
}

export class ChatProfile extends Block<ChatProfileProps> {
  constructor(props: ChatProfileProps = {}) {
    super('div', props);
  }

  componentDidMount() {
    this.element.classList.add('chat__profile');
  }

  render() {
    let avatar = 'http://placekitten.com/50/50';
    if (this.props.chatAvatar) {
      avatar = `https://ya-praktikum.tech/${this.props.chatAvatar}`;
    }

    const content = `
      <img class="chat__img" src="{{ avatar }}" alt="">
      <p class="chat__name">{{ title }}</p>
      <div class="chat_user_controls">
        <span class="add_chat_user">+👤</span>
        <span class="delete_chat_user">−👤</span>
      </div>
    `;

    const template = Handlebars.compile(content);

    const htmlContent = template({
      avatar,
      title: this.props.chatTitle,
    });

    return htmlContent;
  }
}
