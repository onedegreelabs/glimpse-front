import {Inter} from 'next/font/google';
import './globals.css';
import styles from './layout.module.scss';
import Footer from '@/components/Footer/page';
import Header from '@/components/Header/page';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className={styles['children-wrapper']}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
