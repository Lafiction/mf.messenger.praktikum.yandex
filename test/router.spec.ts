import { expect } from 'chai';
import sinon from 'sinon';
import { Block } from '../src/common/block';
import { Route } from '../src/common/route';
import { Router } from '../src/common/router';

class TestBlock extends Block<{}> {
  constructor() {
    super('test', {});
  }
}

describe('Router', () => {
  let router: Router;

  afterEach(() => {
    try {
      (router._onRoute as any).restore();
    } catch (e) {}
  });

  describe('constructor', () => {
    it('should return router instance', () => {
      router = new Router('.app');
      expect(router).to.be.instanceOf(Router);
    });

    it('should return router instance if called twice', () => {
      router = new Router('.app');
      expect(router).to.be.instanceOf(Router);

      const router2 = new Router('hello');
      expect(router2).to.be.instanceOf(Router);

      expect(router).to.equal(router2);
    });
  });

  describe('use()', () => {
    it('should return router instance', () => {
      router = new Router('.app');
      const returned = router.use('hello1', TestBlock);
      
      expect(returned).to.be.instanceOf(Router);
    });

    it('should create new instance of Route', () => {
      router = new Router('.app');
      router.use('hello2', TestBlock);

      const route = router.getRoute('hello2');
      expect(route).to.not.be.undefined;
      expect(route).to.be.instanceOf(Route);
    });
  });

  describe('start()', () => {
    it('should set window.onpopstate listener', () => {
      expect(window.onpopstate).to.be.null;
      router = new Router('.app');
      router.start();
      expect(window.onpopstate).to.be.instanceOf(Function);
    });

    it('should call _onRoute()', () => {
      router = new Router('.app');
      sinon.spy(router, '_onRoute');
      router.start();
      expect((router._onRoute as any).calledOnce).to.be.true;
    });
  });

  describe('_onRoute()', () => {
    it('should do nothing if route does not match', () => {
      router = new Router('.app');
      router.use('hello3', TestBlock);

      const route = router.getRoute('hello3');

      if (route) {
        sinon.spy(route, 'render');

        router._onRoute('test');

        expect((route.render as any).called).to.be.false;
      }
    });

    it('should call Route.render()', () => {
      router = new Router('.app');
      router.use('hello4', TestBlock);

      const route = router.getRoute('hello4');

      if (route) {
        sinon.spy(route, 'render');
        
        router._onRoute('hello4');

      
        expect((route.render as any).called).to.be.true;
      }
    });

    it('should call _currentRoute.leave() if current route present', () => {
      router = new Router('.app');
      router
        .use('hello5', TestBlock)
        .use('hello6', TestBlock);

      const route1 = router.getRoute('hello5');

      if (route1) {
        sinon.spy(route1, 'leave')
      
        router._onRoute('hello5');
        router._onRoute('hello6');

        expect((route1.leave as any).called).to.be.true;
      }
    });
  });

  describe('go()', () => {
    afterEach(() => {
      try {
        (window.history.pushState as any).restore();
      } catch (e) {}
    });

    it('should call history.pushState', () => {
      sinon.spy(window.history, 'pushState');
      router = new Router('.app');
      router.go('test');
      expect((window.history.pushState as any).calledWith({}, '', 'test')).to.be.true;
    });

    it('should call _onRoute()', () => {
      router = new Router('.app');

      sinon.spy(router, '_onRoute');

      router.go('test');

      expect((router._onRoute as any).calledWith('test')).to.be.true;
    });
  });

  describe('back()', () => {
    afterEach(() => {
      try {
        (window.history.back as any).restore();
      } catch (e) {}
    });

    it('should call history.back', () => {
      sinon.spy(window.history, 'back');
      router = new Router('.app');
      router.back();
      expect((window.history.back as any).called).to.be.true;
    });
  });

  describe('forward()', () => {
    afterEach(() => {
      try {
        (window.history.forward as any).restore();
      } catch (e) {}
    });

    it('should call history.forward', () => {
      sinon.spy(window.history, 'forward');
      router = new Router('.app');
      router.forward();
      expect((window.history.forward as any).called).to.be.true;
    });
  });
});

