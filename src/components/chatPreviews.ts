import { Block } from '../block.js';

const Handlebars = (window as any)['Handlebars'];

interface ChatPreviewProps {
  chatPreviewType: string;
}

export class ChatPreview extends Block {
  constructor(props: ChatPreviewProps) {
    super("li", props);
  }

  render() {
    this.element.classList.add("contacts__item"); 
    if (this.props.chatPreviewType.length > 0) {
      this.element.classList.add(this.props.chatPreviewType);
    }
    const content = `
      <div class="wrap">
        <img src="http://placekitten.com/50/50" alt="">
        <div class="meta">
          <p class="name">Lincoln Williamson</p>
          <p class="preview">Sed ut perspiciatis unde omnis riam.</p>
        </div>
      </div>`;

    const template = Handlebars.compile(content);

    const htmlContent = template({});

    return htmlContent;
  }
}
