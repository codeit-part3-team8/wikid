import type { Metadata } from 'next';
import './globals.css';
import '../styles/typography-system.css';
import '../styles/color-variables.css';
import { SnackBarProvider } from '@/contexts/SnackBarContext';

export const metadata: Metadata = {
  title: 'WIKID',
  description: '위키드 - 나만의 위키를 만들어보세요',
  icons: {
    icon: '/favicon.ico',
    // shortcut: '/favicon-16x16.png',
    // apple: '/apple-touch-icon.png',
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
        <SnackBarProvider>{children}</SnackBarProvider>
      </body>
    </html>
  );
}
