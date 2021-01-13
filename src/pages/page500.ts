import { Block } from '../common/block.js';

const Handlebars = (window as any)['Handlebars'];

export class Page500 extends Block<{}> {
  private path: string = '';

  constructor(path: string) {
    super('main', {});
    this.path = path;
    console.log(this.path);
  }

  componentDidMount() {
    this.element.classList.add('mistake-page');
    this.element.classList.add('page500');
  }

  render() {

    const pageContent = `
      <p class="mistake-page__header">500</p>
      <p>Мы уже фиксим</p> 
      <a href="messenger" class="registration">Назад к чатам</a>`; 

    const template = Handlebars.compile(pageContent);

    const page500 = template({});

    return page500;
  }
}
