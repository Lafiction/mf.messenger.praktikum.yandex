/* eslint camelcase: 'off' */
import { HTTPTransport } from './HTTPTransport';

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

export interface RegisterUserRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ChangeProfileRequest {
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar?: string;
  created_by: number;
}

const BASE_URL = 'https://ya-praktikum.tech/api/v2/';

export class MessengerAPI {
  private fetch: HTTPTransport;

  constructor() {
    this.fetch = new HTTPTransport();
  }

  signIn(login: string, password: string): Promise<void> {
    const requestBody = {
      login,
      password,
    };

    return this.fetch.post(`${BASE_URL}auth/signin`, {
      data: JSON.stringify(requestBody),
    }).then(() => {});
  }

  signOut(): Promise<void> {
    return this.fetch.post(`${BASE_URL}auth/logout`, {}).then(() => {});
  }

  registration(requestBody: RegisterUserRequest): Promise<void> {
    return this.fetch.post(`${BASE_URL}auth/signup`, {
      data: JSON.stringify(requestBody),
    }).then(() => {});
  }

  changeUserProfile(requestBody: ChangeProfileRequest): Promise<void> {
    return this.fetch.put(`${BASE_URL}user/profile`, {
      data: JSON.stringify(requestBody),
    }).then(() => {});
  }

  changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const requestBody = {
      oldPassword,
      newPassword,
    };

    return this.fetch.put(`${BASE_URL}user/password`, {
      data: JSON.stringify(requestBody),
    }).then(() => {});
  }

  uploadUserAvatar(formData: FormData): Promise<void> {
    return this.fetch.put(`${BASE_URL}user/profile/avatar`, {
      data: formData,
      contentTypeIsJson: false,
    }).then(() => {});
  }

  getCurrentUserInfo(): Promise<User> {
    return this.fetch.get(`${BASE_URL}auth/user`, {}).then((responseText) => {
      const userData = JSON.parse(responseText);
      return userData;
    });
  }

  getChatsList(): Promise<Chat[]> {
    return this.fetch.get(`${BASE_URL}chats`, {}).then((responseText) => {
      const chatsData = JSON.parse(responseText);
      return chatsData;
    });
  }

  createChat(title: string): Promise<number> {
    const requestBody = {
      title,
    };

    return this.fetch.post(`${BASE_URL}chats`, {
      data: JSON.stringify(requestBody),
    }).then((responseText) => {
      const { id: chatId } = JSON.parse(responseText);
      return chatId;
    });
  }

  addUsersToChat(usersIds: number[], chatId: number): Promise<void> {
    const requestBody = {
      users: usersIds,
      chatId,
    };

    return this.fetch.put(`${BASE_URL}chats/users`, {
      data: JSON.stringify(requestBody),
    }).then(() => {});
  }

  deleteUsersFromChat(usersIds: number[], chatId: number): Promise<void> {
    const requestBody = {
      users: usersIds,
      chatId,
    };

    return this.fetch.delete(`${BASE_URL}chats/users`, {
      data: JSON.stringify(requestBody),
    }).then(() => {});
  }

  getChatToken(chatId: number): Promise<string> {
    const requestBody = {
      chatId,
    };

    return this.fetch.post(`${BASE_URL}chats/token/${chatId}`, {
      data: JSON.stringify(requestBody),
    }).then((responseText) => {
      const { token } = JSON.parse(responseText);
      return token;
    });
  }
}
