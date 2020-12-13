import { Block } from '../common/block.js';

export class ChatProfile extends Block<{}> {
  constructor() {
    super('div', {});
  }

  render() {
    this.element.classList.add('chat__profile');
    return `<img class="chat__img" src="http://placekitten.com/50/50" alt="">
            <p class="chat__name">Brennan Stokes</p>`;
  }
}
