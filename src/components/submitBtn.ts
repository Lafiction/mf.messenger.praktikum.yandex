import { Block } from '../common/block.js';

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
