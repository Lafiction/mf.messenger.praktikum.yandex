const Handlebars = (window as any)['Handlebars']; 

export function makeSubmitBtn(value: string): string {
  const submitFieldContent = `<input type="submit" value="{{ value }}">`;

  const submitFieldTemplate = Handlebars.compile(submitFieldContent);
  
  const submitField = submitFieldTemplate({
    value
  });

  return submitField;
}
