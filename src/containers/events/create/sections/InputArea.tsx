'use client';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './inputArea.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {createEvent} from '@/hooks/swr/useEvents';
import {CreateEventType} from '@/types/eventTypes';
export default function InputArea() {
  const [title, setTitle] = useState('');
  const [startAt, setStartAt] = useState<Date>();
  const [endAt, setEndAt] = useState<Date>();
  const [type, setType] = useState('Online');
  const [handle, setHandle] = useState('');
  const [region, setRegion] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [description, setDescription] = useState('');
  const [imgFile, setImgFile] = useState<File | undefined>();

  // time logic
  useEffect(() => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const roundMinutes = Math.ceil(minutes / 15) * 15;
    if (roundMinutes === 60) {
      currentDate.setHours(hours + 1);
      currentDate.setMinutes(0);
    } else {
      currentDate.setMinutes(roundMinutes);
    }

    setStartAt(currentDate);
    const nextDate = new Date();
    nextDate.setMinutes(roundMinutes + 15);
    setEndAt(nextDate);
  }, []);

  useEffect(() => {
    if (startAt && endAt) {
      if (startAt > endAt) {
        setEndAt(startAt);
      }
    }
  }, [startAt, endAt]);

  // image logic
  const handleImageUpload = (event: {target: {files: FileList | null}}) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setImgFile(selectedFile);
      } else {
        alert('이미지 파일을 선택해주세요.');
      }
    }
  };

  const onClickCreateEvent = function () {
    // if (!title) {
    //   return;
    // } else if (!startAt || !endAt) {
    //   return;
    // } else if (!handle) {
    //   return;
    // } else if (!region) {
    //   return;
    // } else if (!detailAddress) {
    //   return;
    // } else if (!externalLink) {
    //   return;
    // } else if (!description) {
    //   return;
    // } else if (!imgFile) {
    //   return;
    // }
    const params = {
      title: title,
      startAt: startAt,
      endAt: endAt,
      dueAt: endAt,
      type: type,
      handle: handle,
      region: region,
      detailAddress: detailAddress,
      externalLink: externalLink,
      description: description,
      coverImageKey: imgFile,
    };
    const res = createEvent(params);
    console.log(res);
  };

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
              <div className={styles['first-picker']}>
                <ReactDatePicker
                  selected={startAt}
                  onChange={d => {
                    if (d) {
                      setStartAt(d);
                    }
                  }}
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()}
                />
              </div>
              <div className={styles['second-picker']}>
                <ReactDatePicker
                  showTimeSelect
                  selected={startAt}
                  onChange={d => {
                    if (d) {
                      setStartAt(d);
                    }
                  }}
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </div>
            </div>
          </div>
          <div className={styles['date-row']}>
            <div className={styles['text-area']}>End</div>
            <div className={styles['date-wrapper']}>
              <div className={styles['first-picker']}>
                <ReactDatePicker
                  selected={endAt}
                  onChange={d => {
                    if (d) {
                      setEndAt(d);
                    }
                  }}
                  dateFormat="yyyy/MM/dd"
                  minDate={startAt}
                />
              </div>
              <div className={styles['second-picker']}>
                <ReactDatePicker
                  selected={endAt}
                  onChange={d => {
                    if (d) {
                      setEndAt(d);
                    }
                  }}
                  dateFormat="h:mm aa"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                />
              </div>
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
          <div
            className={styles['radio-item']}
            onClick={() => {
              setType('Online');
            }}
          >
            <div
              className={clsx(styles['custom-radio'], {
                [styles['checked']]: type === 'Online',
              })}
            />
            <div className={styles['text-area']}>Online</div>
          </div>
          <div
            className={styles['radio-item']}
            onClick={() => {
              setType('Offline');
            }}
          >
            <div
              className={clsx(styles['custom-radio'], {
                [styles['checked']]: type === 'Offline',
              })}
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
        <input
          style={{display: 'none'}}
          type="file"
          name="fileUpload"
          id="fileUpload"
          onChange={handleImageUpload}
        ></input>
        <div className={styles['add-box']}>
          <div className={styles['icon-text']}>
            <label htmlFor="fileUpload" className={styles['label-button']}>
              <Image
                src={'/assets/events/UploadPurple.svg'}
                alt="uploadPurple"
                width={40}
                height={40}
              />
            </label>

            <div className={styles['text-area']}>Add Image</div>
          </div>
        </div>
      </div>
      {/* button */}
      <div className={styles['create-button']} onClick={onClickCreateEvent}>
        Create Event
      </div>
    </div>
  );
}
