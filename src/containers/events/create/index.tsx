import styles from './index.module.scss';
import InputArea from './sections/InputArea';
export default function EventCreateContainer() {
  return (
    <div className={styles['event-create-wrapper']}>
      <div className={styles['header']}>Create Event</div>
      <div className={styles['required-text']}>Required</div>
      <InputArea />
    </div>
  );
}
