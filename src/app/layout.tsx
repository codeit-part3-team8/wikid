import type { Metadata } from 'next';
import './globals.css';
import '../styles/typography-system.css';
import '../styles/color-variables.css';
import { SnackBarProvider } from '@/contexts/SnackBarContext';
import Header from '@/components/Header/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'WIKID',
  description: '위키드 - 나만의 위키를 만들어보세요',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          <SnackBarProvider>{children}</SnackBarProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
