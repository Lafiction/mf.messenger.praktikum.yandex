import { expect } from 'chai';
import { TextField } from '../src/components/textField';

describe('TextField component', () => {
  describe('when called without actual values', () => {
    it('should generate correct html', () => {
      const submitBtn = new TextField({
        fieldType: '',
        fieldName: '',
        placeholder: ''
      });
      const html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input type="" name="" placeholder="">`);
    });
  });

  describe('when called with not empty type, name, placeholder', () => {
    it('should set type, name, placeholder', () => {
      const submitBtn = new TextField({
        fieldType: 'type',
        fieldName: 'name',
        placeholder: 'placeholder'
      });
      const html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input type="type" name="name" placeholder="placeholder">`);
    });
  });

  describe('when called with not empty value', () => {
    it('should set value', () => {
      const submitBtn = new TextField({
        fieldType: 'type',
        fieldName: 'name',
        placeholder: 'placeholder',
        value: 'test'
      });
      const html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input type="type" name="name" placeholder="placeholder" value="test">`);
    });
  });

  describe('when called with not empty required', () => {
    it('should set required if required == true', () => {
      const submitBtn = new TextField({
        fieldType: 'type',
        fieldName: 'name',
        placeholder: 'placeholder',
        value: 'test',
        required: true
      });
      const html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input type="type" name="name" placeholder="placeholder" value="test" required="">`);
    });

    it('should not set required if required == false', () => {
      const submitBtn = new TextField({
        fieldType: 'type',
        fieldName: 'name',
        placeholder: 'placeholder',
        value: 'test',
        required: false
      });
      const html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input type="type" name="name" placeholder="placeholder" value="test">`);
    });
  });

  describe('when invalid is set', () => {
    it('should add class input__invalid', () => {
      const submitBtn = new TextField({
        fieldType: 'type',
        fieldName: 'name',
        placeholder: 'placeholder',
        invalid: true
      });
      const html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input class="input__invalid" type="type" name="name" placeholder="placeholder">`);
    });

    it('should remove class input__invalid when invalid is set to false through props', () => {
      const submitBtn = new TextField({
        fieldType: 'type',
        fieldName: 'name',
        placeholder: 'placeholder',
        invalid: true
      });
      let html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input class="input__invalid" type="type" name="name" placeholder="placeholder">`);

      submitBtn.setProps({ invalid: false });

      html = submitBtn.getContent().outerHTML;
      expect(html).to.equal(`<input class="" type="type" name="name" placeholder="placeholder">`);
    });
  });
});