import { Block } from '@common/block';

export class Avatar extends Block<{}> {
  constructor() {
    super('img', {});
  }

  render() {
    this.element.classList.add('profile__img');
    this.element.setAttribute('src', 'http://placekitten.com/50/50');
    this.element.setAttribute('alt', '');
    return '';
  }
}
