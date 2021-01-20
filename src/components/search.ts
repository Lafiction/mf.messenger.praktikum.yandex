import { Block } from '../common/block.js';

export class Search extends Block<{}> {
  constructor() {
    super('div', {});
  }

  render() {
    this.element.classList.add('search');
    return `<label class="search__label" for="">🔍</label>
            <input class="search__input" type="text" placeholder="Search contacts...">`;
  }
}
