'use client';
import styles from './page.module.scss';
import clsx from 'clsx';
export default function Footer() {
  const a = true;
  return (
    <div className={styles['footer-wrapper']}>
      <div className={clsx(styles['text-area'], a ? styles['a'] : styles['b'])}>
        hi
      </div>
    </div>
  );
}
