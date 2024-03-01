import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import PageHeader from '@/components/PageHeader';
import LeftNavigation from '@/components/LeftNavigation';
import './globals.css';
import { Link } from 'lucide-react';
import Logout from './logout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tornearia Pettres',
  description: 'Gerenciamento de vendas da Tornearia Pettres',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="pt-br">
      <body className={`flex flex-col ${inter.className} h-screen m-0`}>
        <PageHeader />
        <div className="flex flex-grow">
          <LeftNavigation />
          <div className="flex-grow">
            <nav>
              {!session && <Logout />}
              {!session && <Link href="/login">Login</Link>}
            </nav>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
