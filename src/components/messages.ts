const Handlebars = (window as any)['Handlebars']; 

export function makeMessage(sent: boolean): string {
  let messageType;
  let text;

  const messageContent = `
    <li class="messages__item {{ messageType }}">
      <img class="messages__img" src="http://placekitten.com/50/50" alt="">
      <p class="messages__text">{{ text }}</p>
    </li>
  `;

  if (sent) {
    messageType = 'sent';
    text = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui';
  } else {
    messageType = 'replies';
    text = 'Et harum quidem rerum facilis est et expedita distinctio.';
  }

  const messageTemplate = Handlebars.compile(messageContent);

  const message = messageTemplate({
    messageType,
    text
  });

  return message;
}
