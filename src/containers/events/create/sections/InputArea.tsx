'use client';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './inputArea.module.scss';
import clsx from 'clsx';
import UploadPurple from '@/../public/assets/events/UploadPurple.svg';
import Image from 'next/image';
import {useEffect, useState} from 'react';
export default function InputArea() {
  const [title, setTitle] = useState('');
  const [startAt, setStartAt] = useState<Date>();
  const [endAt, setEndAt] = useState<Date>();
  const [dueAt, setDueAt] = useState<Date>();
  const [type, setType] = useState('Online');
  const [handle, setHandle] = useState('');
  const [region, setRegion] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageKey, setCoverImageKey] = useState('');
  return (
    <div className={styles['input-area']}>
      {/* title */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Title
        </div>
        <input
          placeholder="Title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
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
        <div className={styles['global-time']}>
          <Image
            src={'/assets/events/Earth_icon.svg'}
            width={16}
            height={16}
            alt="earth_icon"
          />
          GMT+ 09:00 Seoul
        </div>
      </div>
      {/* type */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Type
        </div>
        <div className={styles['type-wrapper']}>
          <div className={styles['radio-item']}>
            <div
              className={clsx(styles['custom-radio'], {
                [styles['checked']]: type === 'Online',
              })}
              onClick={() => {
                setType('Online');
              }}
            />
            <div className={styles['text-area']}>Online</div>
          </div>
          <div className={styles['radio-item']}>
            <div
              className={clsx(styles['custom-radio'], {
                [styles['checked']]: type === 'Offline',
              })}
              onClick={() => {
                setType('Offline');
              }}
            />
            <div className={styles['text-area']}>Offline</div>
          </div>
        </div>
      </div>
      {/* location */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Location
        </div>
        {type === 'Online' && (
          <input
            placeholder="Meeting URL (e.g. Zoom link)"
            value={externalLink}
            onChange={e => {
              if (e.target.value.length < 2000) {
                setExternalLink(e.target.value);
              }
            }}
          />
        )}
        {type === 'Offline' && (
          <input
            placeholder="Offline address"
            value={region}
            onChange={e => {
              if (e.target.value.length < 2000) {
                setRegion(e.target.value);
              }
            }}
          />
        )}
        {type === 'Offline' && (
          <input
            placeholder="Detailed address (e.g. Unit 419, Level 4)"
            value={detailAddress}
            onChange={e => {
              if (e.target.value.length < 2000) {
                setDetailAddress(e.target.value);
              }
            }}
          />
        )}
      </div>
      {/* handle */}
      <div className={styles['row-area']}>
        <div className={styles['title-area']}>Event Handle</div>
        <div className={styles['handle-wrapper']}>
          <div className={styles['base-handle']}>
            glimpse.rsvp/events?handle=
          </div>
          <input
            placeholder="Unique ID of your event"
            value={handle}
            onChange={e => {
              setHandle(e.target.value);
            }}
          />
        </div>
      </div>
      {/* description */}
      <div className={styles['row-area']}>
        <div className={styles['title-area']}>Event Description</div>
        <textarea
          value={description}
          onChange={e => {
            if (e.target.value.length < 3000) {
              setDescription(e.target.value);
            }
          }}
          placeholder="Description of your event"
        />
        <div
          className={styles['limit-text']}
        >{`${description.length}/3000`}</div>
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
