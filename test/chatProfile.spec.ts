import { expect } from 'chai';
import { ChatProfile } from '../src/components/chatProfile';

describe('ChatProfile component', () => {
  describe('when called without actual values', () => {
    it('should generate correct html', () => {
      const chatProfile = new ChatProfile();
      const html = chatProfile.getOuterHTML();
      expect(html).to.equal(`<div class="chat__profile">
      <img class="chat__img" src="http://placekitten.com/50/50" alt="">
      <p class="chat__name"></p>
      <div class="chat_user_controls">
        <span class="add_chat_user">+👤</span>
        <span class="delete_chat_user">−👤</span>
      </div>
    </div>`);
    });
  });

  describe('when called with not empty chatAvatar and chatTitle', () => {
    it('should generate correct html', () => {
      const chatProfile = new ChatProfile({
        chatAvatar: 'test',
        chatTitle: 'title',
      });
      const html = chatProfile.getOuterHTML();
      expect(html).to.equal(`<div class="chat__profile">
      <img class="chat__img" src="https://ya-praktikum.tech/test" alt="">
      <p class="chat__name">title</p>
      <div class="chat_user_controls">
        <span class="add_chat_user">+👤</span>
        <span class="delete_chat_user">−👤</span>
      </div>
    </div>`);
    });
  });
});
