'use client';
import {SetStateAction, useEffect, useState} from 'react';
import styles from './page.module.scss';
import CustomInput from '@/components/custom-input/page';
import CustomRadio from '@/components/custom-radio/page';
export default function EventCreate() {
  const [eventTitle, setEventTitle] = useState('');
  const handleEventTitle = function (title: string) {
    setEventTitle(title);
  };
  const radioItems = [
    {text: 'Virtual', value: '0'},
    {text: 'In-person', value: '1'},
    {text: 'Both', value: '2'},
  ];
  return (
    <div className={styles['event-create-wrapper']}>
      <div className={styles['preview-area']}></div>

      <div className={styles['create-area']}>
        <div className={styles['header-area']}>
          <div className={styles['title-text']}>Glimpse Builder</div>
          <div className={styles['sub-title-text']}>
            Input into this field to see the real-time web view on the left.
          </div>
        </div>
        <div className={styles['body-area']}>
          <CustomInput
            name="Event Title *"
            value={eventTitle}
            handleValue={handleEventTitle}
            placeHolder="Title"
          />
          <div className={styles['event-type-radio']}>
            <CustomRadio
              name="Event Title *"
              value={eventTitle}
              items={radioItems}
              handleValue={handleEventTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
