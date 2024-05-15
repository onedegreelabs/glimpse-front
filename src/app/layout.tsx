'use client';

import {Inter} from 'next/font/google';
import './globals.css';
import styles from './layout.module.scss';
import Header from '@/components/header/Header';
import {SessionProvider} from 'next-auth/react';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
        </SessionProvider>
        <div className={styles['children-wrapper']}>{children}</div>
      </body>
    </html>
  );
}
