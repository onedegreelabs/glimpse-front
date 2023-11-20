import {Inter} from 'next/font/google';
import classNames from 'classnames';
import './globals.css';
import styles from './layout.module.scss';

const inter = Inter({subsets: ['latin']});
const cn = classNames.bind(styles);
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles['children-wrapper']}>{children}</div>
      </body>
    </html>
  );
}
