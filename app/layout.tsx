import type { Metadata } from 'next';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { StoreProvider } from '@/lib/store';
import { SaviChatbot } from '@/components/SaviChatbot';
import { Header } from '@/components/Header';
import { AuthWrapper } from '@/components/AuthWrapper';



export const metadata: Metadata = {
  title: 'Smart Expense Analyzer (SEA)',
  description: 'A Behavior-Driven Financial Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen antialiased flex flex-col`}>
        <StoreProvider>
          <AuthWrapper>
            <Header />
            <main className="flex-1 pb-24 relative">
              {children}
            </main>
            <SaviChatbot />
            <Toaster />
          </AuthWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
