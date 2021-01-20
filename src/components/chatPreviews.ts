import * as Handlebars from 'handlebars';
import { Block } from '../common/block';

interface ChatPreviewProps {
  id?: number;
  title?: string;
  avatar?: string;
  chatPreviewType: string;
}

export class ChatPreview extends Block<ChatPreviewProps> {
  constructor(props: ChatPreviewProps) {
    super('li', props);
  }

  render() {
    this.element.classList.add('chats__item');
    if (this.props.chatPreviewType.length > 0) {
      this.element.classList.add(this.props.chatPreviewType);
    }

    let avatar = 'https://placekitten.com/50/50';
    if (this.props.avatar) {
      avatar = `https://ya-praktikum.tech/${this.props.avatar}`;
    }

    const content = `
      <div id="{{ id }}" class="wrap chat_preview_item">
        <img src="{{ avatar }}" alt="">
        <div class="meta">
          <p class="name">{{ title }}</p>
          <p class="preview">Текст сообщения...</p>
        </div>
      </div>`;

    const template = Handlebars.compile(content);

    const htmlContent = template({
      id: this.props.id,
      title: this.props.title,
      avatar,
    });

    return htmlContent;
  }
}
