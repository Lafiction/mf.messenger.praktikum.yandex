import { Block } from '../common/block';

interface TextFieldProps {
  fieldType: string;
  fieldName: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  invalid?: boolean;
}

export class TextField extends Block<TextFieldProps> {
  constructor(props: TextFieldProps) {
    super('input', props);
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
    if (this.props.value) {
      this.element.setAttribute('value', this.props.value);
    }
    if (this.props.required) {
      (this.element as HTMLInputElement).required = this.props.required;
    }
    return '';
  }
}
