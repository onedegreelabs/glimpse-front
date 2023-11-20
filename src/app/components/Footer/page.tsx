'use client';
import styles from './page.module.scss';
import classNames from 'classnames';
export default function Footer() {
  const cn = classNames.bind(styles);
  const a = true;
  return (
    <div className={styles['footer-wrapper']}>
      <div className={cn(styles['text-area'], a ? styles['a'] : styles['b'])}>
        hi
      </div>
    </div>
  );
}
