import {Inter} from 'next/font/google';
import './globals.css';
import styles from './layout.module.scss';
import Header from '@/components/layouts/header';
import {CustomProvider} from '@/lib/custom-provider';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <CustomProvider>
          <div className={styles['children-wrapper']}>{children}</div>
        </CustomProvider>
      </body>
    </html>
  );
}
