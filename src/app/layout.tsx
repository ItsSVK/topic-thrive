import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TopicThrive',
  description: '"Your space, your voice, your vote - join the conversation!"',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Providers>
            <main className="h-screen flex flex-col justify-center items-center">
              {children}
            </main>
          </Providers>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
