import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import Providers from '@/components/Providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TopicThrive',
  description: 'Your space, your voice, your vote - join the conversation!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Provider>
            <main>
              <Navbar />
              {children}
            </main>
          </Provider>
        </Providers>
        <Toaster richColors position="top-right" expand={true} />
      </body>
    </html>
  );
}
