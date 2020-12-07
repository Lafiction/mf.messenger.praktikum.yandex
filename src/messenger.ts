const Handlebars = (window as any)['Handlebars'];

const pageContent = `
  <aside class="sidebar">
  <div class="profile">
    <div class="profile__wrap">
      <img class="profile__img" src="http://placekitten.com/50/50" alt="">
      <button class="profile__btn"><i class="fa fa-cog fa-fw" aria-hidden="true"></i><span>Профиль</span></button>
    </div>
  </div>
  <div class="search">
    <label class="search__label" for="">🔍</label>
    <input class="search__input" type="text" placeholder="Search contacts..." />
  </div>
  <div class="contacts">
    <ul>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Lincoln Williamson</p>
            <p class="preview">Sed ut perspiciatis unde omnis riam.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Brennan Stokes</p>
            <p class="preview">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Delpha Kozey</p>
            <p class="preview">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Johan Bauch</p>
            <p class="preview">But I must explain to you how all this mistaken idea of denouncing pleasure and praising.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Danika Gleason</p>
            <p class="preview">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Berneice Tromp</p>
            <p class="preview"><span>You:</span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Yesenia Johnson Jr.</p>
            <p class="preview">Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Vergie Beer</p>
            <p class="preview"><span>You:</span> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">       
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Laurie Lind</p>
            <p class="preview">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized.</p>
          </div>
        </div>
      </li>
      <li class="contacts__item">
        <div class="wrap">
          <img src="http://placekitten.com/50/50" alt="">
          <div class="meta">
            <p class="name">Deangelo Howell</p>
            <p class="preview">On the other hand, we denounce with righteous indignation and dislike men who are so beguiled.</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="bottombar">
    <button class="bottombar__btn">➕ <span>Add contact</span></button>
  </div>
  </aside>
  <div class="change-chat">
  <span>Выберите чат чтобы отправить сообщение</span>
  </div>
`; 

const template = Handlebars.compile(pageContent);

const messengerPage = template({});

const mainDiv = document.querySelector('.messengerPage');

if (mainDiv) {
  mainDiv.innerHTML = messengerPage;
}

export default {};
