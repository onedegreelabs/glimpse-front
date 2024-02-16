import {Inter} from 'next/font/google';
import './globals.css';
import styles from './layout.module.scss';
import Header from '@/components/Header/page';
import AuthSession from '@/components/session-provider/page';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          <div className={styles['children-wrapper']}>{children}</div>
        </AuthSession>
      </body>
    </html>
  );
}
