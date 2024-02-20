import styles from './datePicker.module.scss';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface DatePickerProps {
  startDate: Date | null;
  setStartDate: (value: Date | null) => void;
  endDate: Date | null;
  setEndDate: (value: Date | null) => void;
}

export default function DatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DatePickerProps) {
  return (
    <div className={styles['date-picker-wrapper']}>
      <div className={styles['name-area']}>Event Date*</div>
      <div className={styles['pick-area']}>
        <div className={styles['date-area']}>
          <div className={styles['text-area']}>Start</div>
          <ReactDatePicker
            showTimeSelect
            selected={startDate}
            onChange={d => setStartDate(d)}
            dateFormat="yyyy/MM/dd h:mm aa"
          />
        </div>
        <div className={styles['date-area']}>
          <div className={styles['text-area']}>End</div>
          <ReactDatePicker
            showTimeSelect
            selected={endDate}
            onChange={d => setEndDate(d)}
            dateFormat="yyyy/MM/dd h:mm aa"
          />
        </div>
      </div>
      <div className={styles['gmt-area']}>GMT+09:00 Seoul</div>
    </div>
  );
}
