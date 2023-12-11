import styles from './page.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface CustomDatePickerProps {
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
}

export default function CustomDatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CustomDatePickerProps) {
  return (
    <div className={styles['date-picker-wrapper']}>
      <div className={styles['name-area']}>Event Date*</div>
      <div className={styles['pick-area']}>
        <div className={styles['start-date']}>
          <div className={styles['text-area']}>Start</div>
          <DatePicker
            showTimeSelect
            selected={startDate}
            onChange={d => setStartDate(d)}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
        <div className={styles['end-date']}>
          <div className={styles['text-area']}>End</div>
          <DatePicker
            showTimeSelect
            selected={startDate}
            onChange={d => setStartDate(d)}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </div>
      <div className={styles['gmt-area']}>GMT+09:00 Seoul</div>
    </div>
  );
}
