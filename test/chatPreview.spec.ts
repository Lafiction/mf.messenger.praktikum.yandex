import { expect } from 'chai';
import { ChatPreview } from '../src/components/chatPreviews';

describe('ChatPreview component', () => {
  describe('when called without actual values', () => {
    it('should generate correct html', () => {
      const chatPreview = new ChatPreview({ chatPreviewType: '' });
      const html = chatPreview.getOuterHTML();
      expect(html).to.equal(`<li class="chats__item">
      <div id="" class="wrap chat_preview_item">
        <img src="https://placekitten.com/50/50" alt="">
        <div class="meta">
          <p class="name"></p>
          <p class="preview">Текст сообщения...</p>
        </div>
      </div></li>`);
    });
  });

  describe('when called with not empty chatPreviewType', () => {
    it('should generate correct html', () => {
      const chatPreview = new ChatPreview({ chatPreviewType: 'test' });
      const html = chatPreview.getOuterHTML();
      expect(html).to.equal(`<li class="chats__item test">
      <div id="" class="wrap chat_preview_item">
        <img src="https://placekitten.com/50/50" alt="">
        <div class="meta">
          <p class="name"></p>
          <p class="preview">Текст сообщения...</p>
        </div>
      </div></li>`);
    });
  });

  describe('when called with not empty id and title', () => {
    it('should generate correct html', () => {
      const chatPreview = new ChatPreview({
        id: 123,
        title: 'test',
        chatPreviewType: '',
      });
      const html = chatPreview.getOuterHTML();
      expect(html).to.equal(`<li class="chats__item">
      <div id="123" class="wrap chat_preview_item">
        <img src="https://placekitten.com/50/50" alt="">
        <div class="meta">
          <p class="name">test</p>
          <p class="preview">Текст сообщения...</p>
        </div>
      </div></li>`);
    });
  });

  describe('when called with not empty avatar', () => {
    it('should generate correct html', () => {
      const chatPreview = new ChatPreview({ avatar: 'test', chatPreviewType: '' });
      const html = chatPreview.getOuterHTML();
      expect(html).to.equal(`<li class="chats__item">
      <div id="" class="wrap chat_preview_item">
        <img src="https://ya-praktikum.tech/test" alt="">
        <div class="meta">
          <p class="name"></p>
          <p class="preview">Текст сообщения...</p>
        </div>
      </div></li>`);
    });
  });
});
