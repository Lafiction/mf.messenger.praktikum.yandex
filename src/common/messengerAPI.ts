import { HTTPTransport } from './HTTPTransport.js';

/* {
  "id": 469,
  "first_name": "string",
  "second_name": "string",
  "display_name": null,
  "login": "string",
  "avatar": null,
  "email": "asd@asd.sd",
  "phone": "+79676245766"
} */

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  avatar?: string;
  email: string;
  phone: string;
}

export class MessengerAPI {
  private fetch: HTTPTransport;

  constructor() {
    this.fetch = new HTTPTransport();
  }

  signIn(login: string, password: string): Promise<XMLHttpRequest> {
    const requestBody = { 
      login: login,
      password: password 
    };
    const promise = this.fetch.post('https://ya-praktikum.tech/api/v2/auth/signin', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    /* promise.then((response: any) => {
      console.log(response.responseText);
    }).catch((error: any) => {
      console.log('Ошибка', error);
    }); */
    return promise;
  }

  signOut(): Promise<XMLHttpRequest> {
    return this.fetch.post('https://ya-praktikum.tech/api/v2/auth/logout', {});
  }

  registration(first_name: string, second_name: string, login: string, email: string, password: string, phone: string): Promise<XMLHttpRequest> {
    const requestBody = { 
      first_name,
      second_name,
      login,
      email,
      password,
      phone
    };
    const promise = this.fetch.post('https://ya-praktikum.tech/api/v2/auth/signup', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    return promise;
  } 

  changeUserProfile(first_name: string, second_name: string, display_name: string, login: string, email: string, phone: string): Promise<XMLHttpRequest> {
    const requestBody = { 
      first_name,
      second_name,
      display_name,
      login,
      email,
      phone
    };
    const promise = this.fetch.put('https://ya-praktikum.tech/api/v2/user/profile', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    return promise;
  }

  changePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {  
    const requestBody = { 
      oldPassword,
      newPassword
    };
    const promise = this.fetch.put('https://ya-praktikum.tech/api/v2/user/password', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    return promise;
  }

  getCurrentUserInfo(): Promise<XMLHttpRequest> {
    return this.fetch.get('https://ya-praktikum.tech/api/v2/auth/user', {});
  }

}

  /*
  changeUserAvatar(): Promise { 
  }

  getChatsList(): Promise<Chat[]>  {
  }

  createChat(title: string): Promise {  
  }

  deleteChatByID(chatId: string): Promise {  
  }

  getUsersByChatID(): Promise {  
  }

  uploadChatAvatar(chatId: string, avatar): Promise {  
  }

  addUsersToChat(chatId: string, users: Users[]): Promise {
  }

  deleteUsersFromChat(chatId: string, users: Users[]): Promise {  
  }*/
