import { expect } from 'chai';
import { SubmitBtn } from '../src/components/submitBtn';

describe('SubmitBtn component', () => {
  describe('when called without actual values', () => {
    it('should generate correct html', () => {
      const submitBtn = new SubmitBtn({ value: ''});
      const html = submitBtn.getOuterHTML();
      expect(html).to.equal(`<input type="submit" value="">`);
    });
  });

  describe('when called without not empty value', () => {
    it('should generate correct html', () => {
      const submitBtn = new SubmitBtn({ value: 'test'});
      const html = submitBtn.getOuterHTML();
      expect(html).to.equal(`<input type="submit" value="test">`);
    });
  });
});