import io, { Socket } from 'socket.io-client';
// import { SOCKET_URL } from "config";

// export const socket: Socket = io('ws://localhost:3001');
export const socket: Socket = io('http://15.207.114.45:80');
// export const socket: Socket = io(
//   `ws://${process.env.SOCKET_IP}:${process.env.SOCKET_PORT}`
// );
