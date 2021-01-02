import { Router } from './common/router.js';
import { IndexPage } from './pages/index.js';
import { RegistrationPage } from './pages/registration.js';
import { ChangeDataPage } from './pages/changedata.js';
import { ChangePasswordPage } from './pages/changepassword.js';
import { MessengerPage } from './pages/messenger.js';
import { Page404 } from './pages/page404.js';
import { Page500 } from './pages/page500.js';
import { ProfilePage } from './pages/profile.js';

const router = new Router(".app");

router
  .use("/", IndexPage)
  .use("/registration", RegistrationPage)
  .use("/changedata", ChangeDataPage)
  .use("/changepassword", ChangePasswordPage)
  .use("/messenger", MessengerPage)
  .use("/page404", Page404)
  .use("/page500", Page500)
  .use("/profile", ProfilePage)
  .start();
