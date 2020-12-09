import { Block } from '../block.js';

const Handlebars = (window as any)['Handlebars']; 

interface TextFieldProps {
  fieldType: string;
  fieldName: string;
  placeholder: string;
  required?: boolean;
}

export class TextField extends Block {
  constructor(props: TextFieldProps) {
    super("input", props);
  }

  render() {
    this.element.setAttribute('type', this.props.fieldType);
    this.element.setAttribute('name', this.props.fieldName);
    this.element.setAttribute('placeholder', this.props.placeholder);
    if (this.props.required) {
      (this.element as HTMLInputElement).required = this.props.required;
    }
    return '';
  }
}

export function makeTextField(fieldType: string, fieldName: string, placeholder: string, required: boolean = false): string {

  let requiredField;

  if (required) {
    requiredField = 'required';
  } else {
    requiredField = '';
  }
  
  const textFieldContent = `<input type="{{ fieldType }}" name="{{ fieldName }}" placeholder="{{ placeholder }}" {{ requiredField }}>`;
  
  const textFieldTemplate = Handlebars.compile(textFieldContent);
  
  const textField = textFieldTemplate({
    fieldType,
    fieldName,
    placeholder,
    requiredField
  });

  return textField;
}
