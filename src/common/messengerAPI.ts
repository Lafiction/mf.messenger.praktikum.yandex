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
      login: login,
      password: password 
    };

    return new Promise((resolve, reject) => {
      this.fetch.post(BASE_URL + 'auth/signin', {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve();
        } else {
          reject(response.responseText);
        }
      })
      .catch((e) => {
        reject(e);
      });
    });
  }

  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fetch.post(BASE_URL + 'auth/logout', {})
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            resolve();
          } else {
            reject(response.responseText);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  registration(requestBody: RegisterUserRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fetch.post(BASE_URL + 'auth/signup', {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve();
        } else {
          reject(response.responseText);
        }
      })
      .catch((e) => {
        reject(e);
      });
    });
  } 

  changeUserProfile(requestBody: ChangeProfileRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.fetch.put(BASE_URL + 'user/profile', {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve();
        } else {
          reject(response.responseText);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  changePassword(oldPassword: string, newPassword: string): Promise<void> {  
    const requestBody = { 
      oldPassword,
      newPassword
    };

    return new Promise((resolve, reject) => {
      this.fetch.put(BASE_URL + 'user/password', {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve();
        } else {
          reject(response.responseText);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  uploadUserAvatar(formData: FormData): Promise<void> { 
    return new Promise((resolve, reject) => {
      this.fetch.put(BASE_URL + 'user/profile/avatar', {
        data: formData,
        contentTypeIsJson: false
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve();
        } else {
          reject(response.responseText);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getCurrentUserInfo(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.fetch.get(BASE_URL + 'auth/user', {})
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            const userData = JSON.parse(response.responseText);
            resolve(userData);
          } else {
            reject(response.responseText);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  getChatsList(): Promise<Chat[]>  {
    return new Promise((resolve, reject) => {
      this.fetch.get(BASE_URL + 'chats', {})
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            const chatsData = JSON.parse(response.responseText);
            resolve(chatsData);
          } else {
            reject(response.responseText);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  
  createChat(title: string): Promise<number> {  
    const requestBody = {
      title
    };
    return new Promise((resolve, reject) => {
      this.fetch.post(BASE_URL + 'chats', {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          const { id: chatId } = JSON.parse(response.responseText);
          resolve(chatId);
        } else {
          reject(response.responseText);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  deleteChat(chatId: string): Promise<XMLHttpRequest> {  
    const requestBody = { 
      chatId
    };
    const promise = this.fetch.delete(BASE_URL + 'chats', {
      data: JSON.stringify(requestBody),
    });
    return promise;
  }

  getChatUsers(chatId: string): Promise<XMLHttpRequest> {  
    const url = BASE_URL + 'chats/' + chatId + '/users'
    return this.fetch.get(url, {});
  }

  addUsersToChat(usersIds: number[], chatId: number): Promise<void> {
    const requestBody = {
      users: usersIds,
      chatId
    };
    return new Promise((resolve, reject) => {
      this.fetch.put(BASE_URL + 'chats/users', {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve();
        } else {
          reject(response.responseText);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  deleteUsersFromChat(usersIds: number[], chatId: number): Promise<void> { 
    const requestBody = {
      users: usersIds,
      chatId
    };
    return new Promise((resolve, reject) => {
      this.fetch.delete(BASE_URL + 'chats/users', {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve();
        } else {
          reject(response.responseText);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getChatToken(chatId: number): Promise<string> {
    const requestBody = {
      chatId
    };
    return new Promise((resolve, reject) => {
      this.fetch.post(BASE_URL + 'chats/token/' + chatId, {
        data: JSON.stringify(requestBody),
      }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          const { token } = JSON.parse(response.responseText);
          resolve(token);
        } else {
          reject(response.responseText);
        }
      })
      .catch((e) => {
        reject(e);
      });
    });
  }
}
