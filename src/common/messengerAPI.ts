import { HTTPTransport } from './HTTPTransport.js';

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

export interface Chat {
  id: number;
  title: string;
  avatar?: string;
  created_by: number;
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

  getChatsList(): Promise<XMLHttpRequest>  {
    return this.fetch.get('https://ya-praktikum.tech/api/v2/chats', {});
  }
  
  createChat(title: string): Promise<XMLHttpRequest> {  
    const requestBody = { 
      title
    };
    const promise = this.fetch.post('https://ya-praktikum.tech/api/v2/chats', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    return promise;
  }

  deleteChat(chatId: string): Promise<XMLHttpRequest> {  
    const requestBody = { 
      chatId
    };
    const promise = this.fetch.delete('https://ya-praktikum.tech/api/v2/chats', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    return promise;
  }

  getChatUsers(chatId: string): Promise<XMLHttpRequest> {  
    const url = 'https://ya-praktikum.tech/api/v2/chats/' + chatId + '/users'
    return this.fetch.get(url, {});
  }

}

  /*

  changeUserAvatar(avatar: string): Promise<XMLHttpRequest> { 
    return 
  }

  +getChatsList(): Promise?????<Chat[]>?????  {
  }

  uploadChatAvatar(chatId: string, avatar): Promise {  
  }



  addUsersToChat(users: Users[], chatId: string,): Promise<XMLHttpRequest> {
    const requestBody = {
      users: [],
      chatId
    };
    const promise = this.fetch.put('https://ya-praktikum.tech/api/v2/chats/users', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    return promise;
  }
  
  deleteUsersFromChat(users: Users[], chatId: string): Promise<XMLHttpRequest> { 
    const requestBody = {
      users: [],
      chatId
    };
    const promise = this.fetch.delete('https://ya-praktikum.tech/api/v2/chats/users', {
      data: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' }
    });
    return promise;
  }

  */
