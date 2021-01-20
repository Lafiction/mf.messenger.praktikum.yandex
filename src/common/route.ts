import { Block } from './block';

export class Route {
  private pathname: string;

  private PageClass: new (path: string) => Block<{}>;

  private page: null | Block<{}>;

  private props: { rootQuery: string };

  constructor(
    pathname: string,
    pageClass: new (path: string) => Block<{}>,
    props: { rootQuery: string },
  ) {
    this.pathname = pathname;
    this.PageClass = pageClass;
    this.page = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render(pathname);
    }
  }

  leave() {
    if (this.page) {
      const root = document.querySelector(this.props.rootQuery);

      if (root) {
        while (root.firstChild) {
          root.firstChild.remove();
        }
        this.page = null;
      }
    }
  }

  match(inputPath: string) {
    if (this.pathname === '') {
      return false;
    }

    if (inputPath === this.pathname) {
      return true;
    }

    try {
      const pattern = new RegExp(`^${this.pathname}$`);
      return !!inputPath.match(pattern);
    } catch (err) {
      return false;
    }
  }

  render(inputPath: string) {
    if (!this.page) {
      this.page = new this.PageClass(inputPath);

      const root = document.querySelector(this.props.rootQuery);

      if (root) {
        root.appendChild(this.page.getContent());
      }
    }
  }
}
