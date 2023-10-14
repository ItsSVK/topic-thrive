import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: '1687462',
  key: 'f4cf2a3731863100bf96',
  secret: '2177121d675bd1f3a5e4',
  cluster: 'ap2',
  useTLS: true,
});

export const pusherClient = new PusherClient('f4cf2a3731863100bf96', {
  cluster: 'ap2',
});
