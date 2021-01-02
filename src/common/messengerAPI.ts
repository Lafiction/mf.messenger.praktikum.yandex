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

const APPLICATION_JSON_HEADERS = {
  headers: { 'Content-Type': 'application/json' }
};

const BASE_URL = 'https://ya-praktikum.tech/api/v2/';

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
    const promise = this.fetch.post(BASE_URL + 'auth/signin', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
    });
    return promise;
  }

  signOut(): Promise<XMLHttpRequest> {
    return this.fetch.post(BASE_URL + 'auth/logout', {});
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
    const promise = this.fetch.post(BASE_URL + 'auth/signup', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
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
    const promise = this.fetch.put(BASE_URL + 'user/profile', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
    });
    return promise;
  }

  changePassword(oldPassword: string, newPassword: string): Promise<XMLHttpRequest> {  
    const requestBody = { 
      oldPassword,
      newPassword
    };
    const promise = this.fetch.put(BASE_URL + 'user/password', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
    });
    return promise;
  }

  uploadUserAvatar(formData: FormData): Promise<XMLHttpRequest> { 
    const promise = this.fetch.put(BASE_URL + 'user/profile/avatar', {
      data: formData,
    });
    return promise;
  }

  getCurrentUserInfo(): Promise<XMLHttpRequest> {
    return this.fetch.get(BASE_URL + 'auth/user', {});
  }

  getChatsList(): Promise<XMLHttpRequest>  {
    return this.fetch.get(BASE_URL + 'chats', {});
  }
  
  createChat(title: string): Promise<XMLHttpRequest> {  
    const requestBody = { 
      title
    };
    const promise = this.fetch.post(BASE_URL + 'chats', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
    });
    return promise;
  }

  deleteChat(chatId: string): Promise<XMLHttpRequest> {  
    const requestBody = { 
      chatId
    };
    const promise = this.fetch.delete(BASE_URL + 'chats', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
    });
    return promise;
  }

  getChatUsers(chatId: string): Promise<XMLHttpRequest> {  
    const url = BASE_URL + 'chats/' + chatId + '/users'
    return this.fetch.get(url, {});
  }

  addUsersToChat(usersIds: number[], chatId: number): Promise<XMLHttpRequest> {
    const requestBody = {
      users: usersIds,
      chatId
    };
    const promise = this.fetch.put(BASE_URL + 'chats/users', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
    });
    return promise;
  }

  deleteUsersFromChat(usersIds: number[], chatId: number): Promise<XMLHttpRequest> { 
    const requestBody = {
      users: usersIds,
      chatId
    };
    const promise = this.fetch.delete(BASE_URL + 'chats/users', {
      data: JSON.stringify(requestBody),
      ...APPLICATION_JSON_HEADERS
    });
    return promise;
  }
}
