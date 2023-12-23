import styles from './page.module.scss';
export default function Header() {
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['text-area']}></div>
    </div>
  );
}
