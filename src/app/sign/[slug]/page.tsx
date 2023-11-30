'use client';

import styles from './page.module.scss';
import SignUp from './up/page';
import SignIn from './in/page';
import {usePathname} from 'next/navigation';

export default function Sign() {
  const pathname = usePathname();
  const pathSegments: string[] = pathname.split('/').filter(Boolean);
  const page: string = pathSegments[1];

  return (
    <div className={styles['sign-wrapper']}>
      <div className={styles['sign-header']}>
        <div className={styles['logo-area']}>
          <div className={styles['text-area']}>Glimpse</div>
        </div>
      </div>
      {page === 'in' && <SignIn />}
      {page === 'up' && <SignUp />}
    </div>
  );
}
