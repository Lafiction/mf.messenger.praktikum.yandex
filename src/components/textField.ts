import { Block } from '../common/block.js';

interface TextFieldProps {
  fieldType: string;
  fieldName: string;
  placeholder: string;
  required?: boolean;
  invalid?: boolean;
}

export class TextField extends Block {
  constructor(props: TextFieldProps) {
    super("input", props);
  }

  render() {
    if (this.props.invalid) {
      this.element.classList.add('input__invalid');
    } else {
      this.element.classList.remove('input__invalid');
    }
    this.element.setAttribute('type', this.props.fieldType);
    this.element.setAttribute('name', this.props.fieldName);
    this.element.setAttribute('placeholder', this.props.placeholder);
    if (this.props.required) {
      (this.element as HTMLInputElement).required = this.props.required;
    }
    return '';
  }
}
