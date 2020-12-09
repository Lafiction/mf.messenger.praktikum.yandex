import { Block } from '../block.js';

export class BottomBar extends Block {
  constructor() {
    super("div");
  }

  render() {
    this.element.classList.add("bottombar");
    return `<button class="bottombar__btn">➕ <span>Add contact</span></button>`;
  }
}

export function makeBottomBar(): string {
  const bottomBarContent = `
  <div class="bottombar">
    <button class="bottombar__btn">➕ <span>Add contact</span></button>
  </div>`;
  return bottomBarContent;
};
