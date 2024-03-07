'use client';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './inputArea.module.scss';
import clsx from 'clsx';
import UploadPurple from '@/../public/assets/events/UploadPurple.svg';
import Image from 'next/image';
export default function InputArea() {
  return (
    <div className={styles['input-area']}>
      {/* title */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Title
        </div>
        <input placeholder="Title" />
      </div>
      {/* date/time */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Date/Time
        </div>
        <div className={styles['date-row-wrapper']}>
          <div className={styles['date-row']}>
            <div className={styles['text-area']}>Start</div>
            <div className={styles['date-wrapper']}>
              <ReactDatePicker
                showTimeSelect
                selected={new Date()}
                onChange={d => {}}
                dateFormat="yyyy/MM/dd"
              />
              <ReactDatePicker
                showTimeSelect
                selected={new Date()}
                onChange={d => {}}
                dateFormat="h:mm aa"
              />
            </div>
          </div>
          <div className={styles['date-row']}>
            <div className={styles['text-area']}>End</div>
            <div className={styles['date-wrapper']}>
              <ReactDatePicker
                showTimeSelect
                selected={new Date()}
                onChange={d => {}}
                dateFormat="yyyy/MM/dd"
              />
              <ReactDatePicker
                showTimeSelect
                selected={new Date()}
                onChange={d => {}}
                dateFormat="h:mm aa"
              />
            </div>
          </div>
        </div>
      </div>
      {/* type */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Type
        </div>
        <div className={styles['type-wrapper']}>
          <div className={styles['radio-item']}>
            <div className={clsx(styles['custom-radio'], styles['checked'])} />
            <div className={styles['text-area']}>Online</div>
          </div>
          <div className={styles['radio-item']}>
            <div className={styles['custom-radio']} />
            <div className={styles['text-area']}>Offline</div>
          </div>
        </div>
      </div>
      {/* location */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Location
        </div>
        <input placeholder="Meeting URL (online) or address (offline)" />
        <div className={styles['limit-text']}>0/2000</div>
      </div>
      {/* handle */}
      <div className={styles['row-area']}>
        <div className={styles['title-area']}>Event Handle</div>
        <div className={styles['handle-wrapper']}>
          <div className={styles['base-handle']}>
            glimpse.rsvp/events?handle=
          </div>
          <input placeholder="Unique ID of your event" />
        </div>
      </div>
      {/* description */}
      <div className={styles['row-area']}>
        <div className={styles['title-area']}>Event Description</div>
        <textarea></textarea>
        <div className={styles['limit-text']}>0/3000</div>
      </div>
      {/* image */}
      <div className={styles['row-area']}>
        <div className={styles['title-area']}>Event Cover image</div>
        <div className={styles['add-box']}>
          <div className={styles['icon-text']}>
            <Image src={UploadPurple} alt="uploadPurple" />
            <div className={styles['text-area']}>Add Image</div>
          </div>
        </div>
      </div>
      {/* button */}
      <div className={styles['create-button']}>Create Event</div>
    </div>
  );
}
