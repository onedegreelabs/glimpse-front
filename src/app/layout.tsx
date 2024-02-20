import {Inter} from 'next/font/google';
import './globals.css';
import styles from './layout.module.scss';
import {CustomProvider} from '@/lib/custom-provider';
import AuthSession from '@/components/sessionProvider/AuthSession';

const inter = Inter({subsets: ['latin']});
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomProvider>
          <AuthSession>
            <div className={styles['children-wrapper']}>{children}</div>
          </AuthSession>
        </CustomProvider>
      </body>
    </html>
  );
}
