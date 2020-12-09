import { Block } from '../common/block.js';

const Handlebars = (window as any)['Handlebars']; 

interface MessageProps {
  messageType: string;
  messageText: string;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super("li", props);
  }

  render() {
    this.element.classList.add("messages__item");
    if (this.props.messageType.length > 0) {
      this.element.classList.add(this.props.messageType);
    }

    const content = `
      <img class="messages__img" src="http://placekitten.com/50/50" alt="">
      <p class="messages__text">{{ text }}</p>`;

    const template = Handlebars.compile(content);

    const htmlContent = template({
      text: this.props.messageText
    });

    return htmlContent;
  }
}
