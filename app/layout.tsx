import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PageHeader from '@/components/PageHeader';
import LeftNavigation from '@/components/LeftNavigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tornearia Pettres',
  description: 'Gerenciamento de vendas da Tornearia Pettres',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`flex flex-col ${inter.className} h-screen m-0`}>
        <PageHeader />
        <div className="flex flex-grow">
          <LeftNavigation />
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
