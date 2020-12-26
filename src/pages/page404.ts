import { Block } from '../common/block.js';

const Handlebars = (window as any)['Handlebars'];

class Page404 extends Block<{}> {

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
      <a href="messenger.html" class="registration">Назад к чатам</a>`; 

    const template = Handlebars.compile(pageContent);

    const page404 = template({});

    return page404;
  }
}

const page404Component = new Page404();

const mainDiv = document.querySelector('.app');

if (mainDiv) {
  mainDiv.appendChild(page404Component.getContent());
}

export default {};
