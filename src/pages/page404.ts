import { Block } from '../common/block.js';

const Handlebars = (window as any)['Handlebars'];

export class Page404 extends Block<{}> {

  constructor(path: string) {
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

