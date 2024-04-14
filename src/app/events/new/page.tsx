import styles from './page.module.scss';
import InputArea from './sections/InputArea';
export default function EventCreatePage() {
  return (
    <div className={styles['event-create-wrapper']}>
      <div className={styles['header']}>Create Event</div>
      <div className={styles['required-text']}>Required</div>
      <InputArea />
    </div>
  );
}
