import { Block } from '../block.js';

const Handlebars = (window as any)['Handlebars']; 

interface SubmitBtnProps {
  value: string;
}

export class SubmitBtn extends Block {
  constructor(props: SubmitBtnProps) {
    super("input", props);
  }

  render() {
    this.element.setAttribute('type', 'submit');
    this.element.setAttribute('value', this.props.value);
    return '';
  }
}


export function makeSubmitBtn(value: string): string {
  const submitFieldContent = `<input type="submit" value="{{ value }}">`;

  const submitFieldTemplate = Handlebars.compile(submitFieldContent);
  
  const submitField = submitFieldTemplate({
    value
  });

  return submitField;
}
