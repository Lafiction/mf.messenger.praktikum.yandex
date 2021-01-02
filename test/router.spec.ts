import { expect } from "chai";
import { Router } from '../src/common/router';

describe('Router', () => {
  describe('constructor', () => {
    it('should return router instance', () => {
      const router = new Router(".app");
      expect(router).to.be.instanceOf(Router);
    });
  });
});

