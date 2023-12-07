import styles from './page.module.scss';
export default function DatePicker() {
  return (
    <div className={styles['date-picker-wrapper']}>
      <div className={styles['name-area']}>Event Date*</div>
      <div className={styles['pick-area']}>
        <div className={styles['start-date']}>
          <div className={styles['text-area']}>Start</div>
        </div>
        <div className={styles['end-date']}>
          <div className={styles['text-area']}>End</div>
        </div>
      </div>
      <div className={styles['gmt-area']}>GMT+09:00 Seoul</div>
    </div>
  );
}
