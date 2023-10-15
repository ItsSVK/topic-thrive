import { redirect } from 'next/navigation';
import dotenv from 'dotenv';
dotenv.config();

export default async function Home() {
  redirect('/admin');
}
