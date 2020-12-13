import { Block } from '../common/block.js';

export class ProfileBtn extends Block<{}> {
  constructor() {
    super('button', {});
  }

  render() {
    this.element.classList.add('profile__btn');
    return `⚙️<span>Профиль</span>`;
  }
}
