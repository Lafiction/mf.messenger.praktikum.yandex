const Handlebars = (window as any)['Handlebars']; 

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
