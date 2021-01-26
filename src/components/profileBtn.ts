import { Block } from '@common/block';

export class ProfileBtn extends Block<{}> {
  constructor() {
    super('button', {});
  }

  render() {
    this.element.classList.add('profile__btn');
    return '⚙️ Профиль';
  }
}
