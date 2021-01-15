import { Block } from '../common/block.js';

export class BottomBar extends Block<{}> {
  constructor() {
    super('div', {});
  }

  render() {
    this.element.classList.add('bottombar');
    return `<button class="add-new-chat__btn">➕ <span>Add new chat</span></button>`;
  }
}
