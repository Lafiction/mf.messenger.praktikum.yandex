import { expect } from 'chai';
import { Message } from '../src/components/messages';

describe('Message component', () => {
  describe('when called without actual values', () => {
    it('should generate correct html', () => {
      const message = new Message({
        messageType: '',
        messageText: ''
      });
      const html = message.getOuterHTML();
      expect(html).to.equal(`<li class="messages__item">
      <img class="messages__img" src="http://placekitten.com/50/50" alt="">
      <p class="messages__text"></p></li>`);
    });
  });

  describe('when called with not empty type and text', () => {
    it('should generate correct html', () => {
      const message = new Message({
        messageType: 'type',
        messageText: 'text'
      });
      const html = message.getOuterHTML();
      expect(html).to.equal(`<li class="messages__item type">
      <img class="messages__img" src="http://placekitten.com/50/50" alt="">
      <p class="messages__text">text</p></li>`);
    });
  });
});