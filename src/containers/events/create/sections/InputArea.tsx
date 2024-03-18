'use client';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './inputArea.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import {useCallback, useEffect, useState} from 'react';
import {createEvent} from '@/hooks/swr/useEvents';
import {checkDuplicateHandle} from '@/hooks/swr/useEvents';
import _ from 'lodash';

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

  const [errorState, setErrorState] = useState('');

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

  const handleErrorState = function (state: string) {
    setErrorState(state);
    setTimeout(() => {
      setErrorState('');
    }, 2000);
  };
  const onClickCreateEvent = function () {
    if (!title) {
      handleErrorState('title');
      return;
    } else if (!startAt || !endAt) {
      return;
    } else if (!handle) {
      handleErrorState('handle');
      return;
    } else if (!region) {
      handleErrorState('region');
      return;
    } else if (!detailAddress) {
      handleErrorState('detailAddress');
      return;
    } else if (!externalLink) {
      handleErrorState('externalLink');
      return;
    } else if (!description) {
      handleErrorState('description');
      return;
    } else if (!imgFile) {
      handleErrorState('imgFile');
      return;
    }
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

  const checkDuplicate = useCallback(
    _.debounce(async handle => {
      if (handle.length >= 2) {
        const res = await checkDuplicateHandle(handle);
        const isDuplicate = res.data.data;
        if (isDuplicate) {
          handleErrorState('handleDuplicate');
        }
      }
    }, 1000),
    []
  );

  useEffect(() => {
    if (handle.length >= 2) {
      checkDuplicate(handle);
    }
  }, [handle]);

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
            if (e.target.value.length <= 100) {
              setTitle(e.target.value);
            } else {
              handleErrorState('titleLimit');
            }
          }}
          className={clsx([
            {
              [styles['error']]:
                errorState === 'title' || errorState === 'titleLimit',
            },
          ])}
        />
        <div
          className={clsx([
            styles['error-message'],
            {
              [styles['show-error']]:
                errorState === 'title' || errorState === 'titleLimit',
            },
          ])}
        >
          <Image
            src={'/assets/events/Warning.svg'}
            alt="warning"
            width={16}
            height={16}
          />
          {errorState === 'title'
            ? 'Please enter the title of your event.'
            : 'Please enter the event title between 1 and 100 characters.'}
        </div>
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
          <>
            <input
              placeholder="Meeting URL (e.g. Zoom link)"
              value={externalLink}
              onChange={e => {
                if (e.target.value.length < 2000) {
                  setExternalLink(e.target.value);
                }
              }}
              className={clsx([
                {
                  [styles['error']]:
                    errorState === 'externalLink' ||
                    errorState === 'externalLinkLimit',
                },
              ])}
            />
            <div
              className={clsx([
                styles['error-message'],
                {
                  [styles['show-error']]:
                    errorState === 'externalLink' ||
                    errorState === 'externalLinkLimit',
                },
              ])}
            >
              <Image
                src={'/assets/events/Warning.svg'}
                alt="warning"
                width={16}
                height={16}
              />
              {errorState === 'externalLink'
                ? 'Please enter the URL of your event.'
                : 'Please enter the meeting URL between 1 and 1999 charachters.'}
            </div>
          </>
        )}
        {type === 'Offline' && (
          <>
            <input
              placeholder="Offline address"
              value={region}
              onChange={e => {
                if (e.target.value.length < 2000) {
                  setRegion(e.target.value);
                }
              }}
              className={clsx([
                {
                  [styles['error']]: errorState === 'region',
                },
              ])}
            />
            <div
              className={clsx([
                styles['error-message'],
                styles['for-region'],
                {
                  [styles['show-error']]: errorState === 'region',
                },
              ])}
            >
              <Image
                src={'/assets/events/Warning.svg'}
                alt="warning"
                width={16}
                height={16}
              />
              Please enter the address of the event location.
            </div>
          </>
        )}
        {type === 'Offline' && (
          <>
            <input
              placeholder="Detailed address (e.g. Unit 419, Level 4)"
              value={detailAddress}
              onChange={e => {
                if (e.target.value.length < 2000) {
                  setDetailAddress(e.target.value);
                } else {
                  handleErrorState('detailAddressLimit');
                }
              }}
              className={clsx([
                {
                  [styles['error']]:
                    errorState === 'detailAddress' ||
                    errorState === 'detailAddressLimit',
                },
              ])}
            />
            <div
              className={clsx([
                styles['error-message'],
                {
                  [styles['show-error']]:
                    errorState === 'detailAddress' ||
                    errorState === 'detailAddressLimit',
                },
              ])}
            >
              <Image
                src={'/assets/events/Warning.svg'}
                alt="warning"
                width={16}
                height={16}
              />
              {errorState === 'detailAddress'
                ? 'Please enter the the detailed address.'
                : 'Please enter the event location between 1 and 1999 characters.'}
            </div>
          </>
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
            className={clsx([
              {
                [styles['error']]:
                  errorState === 'handle' || errorState === 'handleDuplicate',
              },
            ])}
          />
          <div
            className={clsx([
              styles['error-message'],
              {
                [styles['show-error']]:
                  errorState === 'handle' || errorState === 'handleDuplicate',
              },
            ])}
          >
            <Image
              src={'/assets/events/Warning.svg'}
              alt="warning"
              width={16}
              height={16}
            />
            {errorState === 'handle'
              ? 'Please enter the event handle between 2 and 19 characters. Only alphabets and numbers.'
              : 'Already exists. Please try another one.'}
          </div>
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
          className={clsx([
            {
              [styles['error']]: errorState === 'description',
            },
          ])}
        />
        <div
          className={clsx([
            styles['error-message'],
            {
              [styles['show-error']]: errorState === 'description',
            },
          ])}
        >
          <Image
            src={'/assets/events/Warning.svg'}
            alt="warning"
            width={16}
            height={16}
          />
          Please enter the the detailed address.
        </div>
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
        <div
          className={clsx([
            styles['error-message'],
            {
              [styles['show-error']]: errorState === 'imgFile',
            },
          ])}
        >
          <Image
            src={'/assets/events/Warning.svg'}
            alt="warning"
            width={16}
            height={16}
          />
          <div>
            <div>Image size exceeds the limit (10MB).</div>
            <div>Please upload another image with a smaller file size.</div>
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
