import { Block } from './block.js';

export class Route {
  private _pathname: string;
  private _pageClass: new (path: string) => Block<{}>;
  private _page: null | Block<{}>;
  private _props: { rootQuery: string };

  constructor(pathname: string, pageClass: new (path: string) => Block<{}>, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._pageClass = pageClass;
    this._page = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render(pathname);
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

  match(inputPath: string) {
    if (this._pathname === '') {
      return false; 
    }

    if (inputPath === this._pathname) {
      return true;
    }

    try {
      const pattern = new RegExp('^' + this._pathname + '$');
      return !!inputPath.match(pattern);
    } catch (err) {
      return false; 
    }
  }

  render(inputPath: string) {
    if (!this._page) {
      this._page = new this._pageClass(inputPath);

      const root = document.querySelector(this._props.rootQuery);

      if (root) {
        root.appendChild(this._page.getContent());
      }
            
      return;
    }
  }
} 
