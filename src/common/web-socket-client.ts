export function getSocket(userId: number, chatId: number, tokenValue: string): Promise<WebSocket> {
  const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${tokenValue}`);

  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      resolve(socket);
    });

    socket.addEventListener('error', (event) => {
      reject(event);
    });
  });
}
