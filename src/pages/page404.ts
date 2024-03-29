import * as Handlebars from 'handlebars';
import { Block } from '@common/block';

export class Page404 extends Block<{}> {
  constructor() {
    super('main', {});
  }

  componentDidMount() {
    this.element.classList.add('mistake-page');
    this.element.classList.add('page404');
  }

  render() {
    const pageContent = `
      <p class="mistake-page__header">404</p>
      <p>Такой страницы не существует</p> 
      <a href="/messenger" class="registration">Назад к чатам</a>`;

    const template = Handlebars.compile(pageContent);

    const page404 = template({});

    return page404;
  }
}
