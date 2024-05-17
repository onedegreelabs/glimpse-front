'use client';

import {Inter} from 'next/font/google';
import './globals.css';
import styles from './layout.module.scss';
import Header from '@/components/header/Header';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className={styles['children-wrapper']}>{children}</div>
      </body>
    </html>
  );
}
