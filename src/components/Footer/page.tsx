'use client';
import styles from './page.module.scss';
import clsx from 'clsx';
export default function Footer() {
  return (
    <div className={styles['footer-wrapper']}>
      <div className={clsx(styles['text-area'])}>Glimpse is made by XZY</div>
    </div>
  );
}
