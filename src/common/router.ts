import { Block } from './block.js';
import { Route } from './route.js';

export class Router {
  private static instance: Router;

  private routes!: Route[];

  private history!: History;

  private currentRoute: null | Route = null;

  private rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.instance = this;
  }

  use(pathname: string, pageClass: new (path: string) => Block<{}>) {
    const route = new Route(pathname, pageClass, { rootQuery: this.rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: any) => {
      this.onRoute(event.currentTarget.location.pathname);
    };
    this.onRoute(window.location.pathname);
  }

  onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      const page404 = this.getRoute('/page404');
      if (!page404) {
        return;
      }
      route = page404;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render(pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => { return route.match(pathname); });
  }
}

export default Router;
