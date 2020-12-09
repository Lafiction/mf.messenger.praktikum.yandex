import { Block } from '../block.js';

export class ChatProfile extends Block {
  constructor() {
    super("div");
  }

  render() {
    this.element.classList.add("chat__profile");
    return `<img class="chat__img" src="http://placekitten.com/50/50" alt="">
            <p class="chat__name">Brennan Stokes</p>`;
  }
}

export function makeChatProfile(): string {
  const chatProfileContent = `
  <div class="chat__profile">
    <img class="chat__img" src="http://placekitten.com/50/50" alt="">
    <p class="chat__name">Brennan Stokes</p>
  </div>`;
  return chatProfileContent;
}
