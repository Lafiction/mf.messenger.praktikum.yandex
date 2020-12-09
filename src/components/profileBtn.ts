import { Block } from '../block.js';

export class ProfileBtn extends Block {
  constructor() {
    super('button');
  }

  render() {
    this.element.classList.add('profile__btn');
    return `⚙️<span>Профиль</span>`;
  }
}

export function makeProfileBtn(): string {
  const profileBtnContent = `<button class="profile__btn">⚙️<span>Профиль</span></button>`;
  return profileBtnContent;
}
