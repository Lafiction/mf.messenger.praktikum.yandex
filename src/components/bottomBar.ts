import { Block } from '../common/block.js';

export class BottomBar extends Block<{}> {
  constructor() {
    super('div', {});
  }

  render() {
    this.element.classList.add('bottombar');
    return `<button class="bottombar__btn">➕ <span>Add contact</span></button>`;
  }
}
