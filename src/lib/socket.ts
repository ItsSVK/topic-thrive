import io, { Socket } from 'socket.io-client';
// import { SOCKET_URL } from "config";

export const socket: Socket = io('ws://localhost:3001');
