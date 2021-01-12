import { expect } from 'chai';
import { Block } from '../src/common/block';
import { Route } from '../src/common/route';

/* 
1) inputUrl === this._pathname (messenger) 
2) inputUrl - пустая строка 
3) если inputUrl !== this._pathname, regexp от this._pathname, совпадает с переданной строкой 
4) regexp от this._pathname, не совпадает с переданной строкой 

5) из this._pathname невозможно сделать regexp
*/

class TestBlock extends Block<{}> {
  constructor() {
    super('test', {});
  }
}

describe('Route match', () => {  
  it('should return true if inputUrl equal to this.pathname', () => {
    const route = new Route('/messenger', TestBlock, { rootQuery: '.app' });
    expect(route.match('/messenger')).to.equal(true);
  });

  it('should return false if inputUrl is not equal to this.pathname', () => {
    const route = new Route('/messenger', TestBlock, { rootQuery: '.app' });
    expect(route.match('/messenger1')).to.equal(false);
  });

  it('should return false if inputUrl is empty string', () => {
    const route = new Route('', TestBlock, { rootQuery: '.app' });
    expect(route.match('/messenger')).to.equal(false);
  });
  
  it('should return true if inputUrl matches with this.pathname as regex [/chat/123]', () => {
    const route = new Route('\/chat\/\\d+', TestBlock, { rootQuery: '.app' }); 
    expect(route.match('/chat/123')).to.equal(true);
  });

  it('should return false if inputUrl does not match with this.pathname as regex [/chat/abc]', () => {
    const route = new Route('\/chat\/\\d+', TestBlock, { rootQuery: '.app' }); 
    expect(route.match('/chat/abc')).to.equal(false);
  });

  it('should return false if inputUrl does not match with this.pathname as regex [/chat/]', () => {
    const route = new Route('\/chat\/\\d+', TestBlock, { rootQuery: '.app' }); 
    expect(route.match('/chat/')).to.equal(false);
  });

  it('should return false if inputUrl does not match with this.pathname as regex [/chat]', () => {
    const route = new Route('\/chat\/\\d+', TestBlock, { rootQuery: '.app' }); 
    expect(route.match('/chat')).to.equal(false);
  });

  it('should return false if inputUrl does not match this.pathname as regex [123/chat/123wfqrgwerg]', () => {
    const route = new Route('\/chat\/\\d+', TestBlock, { rootQuery: '.app' }); 
    expect(route.match('123/chat/123wfqrgwerg')).to.equal(false); 
  });  

});
