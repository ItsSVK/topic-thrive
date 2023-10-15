declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DATABASE_URL: string;
      NEXTAUTH_URL: string;
      PUSHER_APP_ID: string;
      PUSHER_APP_KEY: string;
      PUSHER_APP_SECRET: string;
      PUSHER_APP_CLUSTER: string;
    }
  }
}

export {};
