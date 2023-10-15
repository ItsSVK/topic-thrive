import { redirect } from 'next/navigation';
import dotenv from 'dotenv';
dotenv.config();

export default async function Home() {
  console.log('PUSHER_APP_KEY:', process.env.PUSHER_APP_ID);

  redirect('/admin');
}
