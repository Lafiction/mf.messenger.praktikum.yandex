const Handlebars = (window as any)['Handlebars']; 

export function makeChatPreview(active: boolean): string {
  let chatPreviewType;

  const chatPreviewContent = `
  <li class="contacts__item {{ chatPreviewType }}">
    <div class="wrap">
      <img src="http://placekitten.com/50/50" alt="">
      <div class="meta">
        <p class="name">Lincoln Williamson</p>
        <p class="preview">Sed ut perspiciatis unde omnis riam.</p>
      </div>
    </div>
  </li>`;

  if (active) {
    chatPreviewType = 'active';
  } else {
    chatPreviewType = '';
  } 

  const chatPreviewTemplate = Handlebars.compile(chatPreviewContent);
  
  const chatPreview = chatPreviewTemplate({
    chatPreviewType,
  });

  return chatPreview;
}
