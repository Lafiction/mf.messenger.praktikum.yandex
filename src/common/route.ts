import { Block } from './block.js';

export class Route {
  private _pathname: string;
  private _pageClass: new () => Block<{}>;
  private _page: null | Block<{}>;
  private _props: { rootQuery: string };

  constructor(pathname: string, pageClass: new () => Block<{}>, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._pageClass = pageClass;
    this._page = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._page) {
      const root = document.querySelector(this._props.rootQuery);

      if (root) {
        while (root.firstChild) {
          root.firstChild.remove()
        }
        this._page = null;
      }
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._page) {
      this._page = new this._pageClass();

      const root = document.querySelector(this._props.rootQuery);

      if (root) {
        root.appendChild(this._page.getContent());
      }
            
      return;
    }
  }
} 
