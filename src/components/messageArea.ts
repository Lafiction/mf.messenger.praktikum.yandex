import { Block } from '../block.js';

export class MessageArea extends Block {
  constructor() {
    super("div");
  }

  render() {
    this.element.classList.add("message-area");
    return `<div class="message-area__wrap">
              <span class="message-area__attachment">📎</span>
              <input class="message-area__input" type="text" placeholder="Write a message..." name="message">
              <button class="message-area__btn">⬆️</button>
            </div>`;
  }
}

export function makeMessageArea(): string {
  const messageAreaContent = `
  <div class="message-area">
    <div class="message-area__wrap">
      <span class="message-area__attachment">📎</span>
      <input class="message-area__input" type="text" placeholder="Write a message..." name="message">
      <button class="message-area__btn">⬆️</button>
    </div>
  </div>`;
  return messageAreaContent;
}
