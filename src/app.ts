/* eslint no-useless-escape: 'off' */

import { Router } from '@common/router';
import { IndexPage } from '@pages/index';
import { RegistrationPage } from '@pages/registration';
import { ChangeDataPage } from '@pages/changedata';
import { ChangePasswordPage } from '@pages/changepassword';
import { MessengerPage } from '@pages/messenger';
import { ChatPage } from '@pages/chat';
import { Page404 } from '@pages/page404';
import { Page500 } from '@pages/page500';
import { ProfilePage } from '@pages/profile';

const router = new Router('.app');

router
  .use('/', IndexPage)
  .use('/registration', RegistrationPage)
  .use('/changedata', ChangeDataPage)
  .use('/changepassword', ChangePasswordPage)
  .use('/messenger', MessengerPage)
  .use('\/chat\/\\d+', ChatPage)
  .use('/page404', Page404)
  .use('/page500', Page500)
  .use('/profile', ProfilePage)
  .start();
