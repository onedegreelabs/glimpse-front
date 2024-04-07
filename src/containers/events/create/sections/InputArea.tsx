'use client';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './inputArea.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import {
  ChangeEvent,
  FocusEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {createEvent} from '@/hooks/swr/useEvents';
import {checkDuplicateHandle} from '@/hooks/swr/useEvents';
import _ from 'lodash';
import SuccessModal from '../components/successModal';
import {useIsLoginStore} from '@/stores/auth';
import {useRouter} from 'next/navigation';

export default function InputArea() {
  const router = useRouter();
  const isLogin = useIsLoginStore(state => state.isLogin);
  useEffect(() => {
    if (!isLogin) {
      router.push('/sign');
    }
  }, [isLogin]);
  const [title, setTitle] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const [startAt, setStartAt] = useState<Date>(new Date());
  const startRef = useRef<HTMLInputElement>(null);
  const [endAt, setEndAt] = useState<Date>(new Date());
  const [minZeroTime, setMinZeroTime] = useState<Date>();
  const [maxTime, setMaxTime] = useState<Date>();
  const endRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState('Online');
  const [handle, setHandle] = useState('');
  const handleRef = useRef<HTMLInputElement>(null);
  const [region, setRegion] = useState('');
  const regionRef = useRef<HTMLInputElement>(null);
  const [detailAddress, setDetailAddress] = useState('');
  const detailAddressRef = useRef<HTMLInputElement>(null);
  const [externalLink, setExternalLink] = useState('');
  const externalLinkRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState('');
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [imgFile, setImgFile] = useState<File | undefined>();
  const imgFileRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [errorState, setErrorState] = useState('');
  const [validState, setValidState] = useState('');

  // time logic
  function isDateEqual(date1: Date, date2: Date) {
    return (
      date1?.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

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

    const newMaxTime = new Date();
    newMaxTime.setHours(23);
    newMaxTime.setMinutes(50);
    setMaxTime(newMaxTime);

    const newZeroTime = new Date();
    newZeroTime.setHours(0);
    newZeroTime.setMinutes(0);
    setMinZeroTime(newZeroTime);
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
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          setImgUrl(reader.result);
        };
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
  const handleValidState = function (state: string) {
    setValidState(state);
    setTimeout(() => {
      setValidState('');
    }, 2000);
  };

  const scrollToElement = function (
    target: RefObject<HTMLInputElement> | RefObject<HTMLTextAreaElement>
  ) {
    if (target.current) {
      target.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  const onClickCreateEvent = async function () {
    if (!title) {
      scrollToElement(titleRef);
      handleErrorState('title');
      return;
    } else if (!startAt || !endAt) {
      if (!startAt) {
        scrollToElement(startRef);
      } else {
        scrollToElement(endRef);
      }
      return;
    } else if (type === 'Offline' && !region) {
      scrollToElement(regionRef);
      handleErrorState('region');
      return;
    } else if (type === 'Offline' && !detailAddress) {
      scrollToElement(detailAddressRef);
      handleErrorState('detailAddress');
      return;
    } else if (type === 'Online' && !externalLink) {
      scrollToElement(externalLinkRef);
      handleErrorState('externalLink');
      return;
    } else if (!handle) {
      scrollToElement(handleRef);
      handleErrorState('handle');
      return;
    } else if (!description) {
      scrollToElement(descriptionRef);
      handleErrorState('description');
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
    };
    const res = await createEvent(params, imgFile);
    if (res.status === 201) {
      setShowModal(true);
    }
  };

  // handle logic
  const changeHandle = function (
    e: ChangeEvent<HTMLInputElement>,
    targetInput: string
  ) {
    const value = e.target.value;
    const newValue = value.replace(/[^a-zA-Z0-9]/g, '');
    if (value !== newValue) {
      switch (targetInput) {
        case 'handle':
          handleErrorState('handle');
          break;
        default:
          null;
      }
    }
    const loweredNewValue = newValue.toLocaleLowerCase();
    setHandle(loweredNewValue);
  };

  const checkDuplicate = useCallback(
    _.debounce(async handle => {
      if (handle.length >= 2 && errorState !== 'handle') {
        const res = await checkDuplicateHandle(handle);
        const isDuplicate = res.data.data;
        if (isDuplicate) {
          handleErrorState('handleDuplicate');
        } else {
          handleValidState('handle');
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

  // check input valid when blur (focus out input)
  const checkInputValid = function (
    e:
      | FocusEvent<HTMLInputElement, Element>
      | FocusEvent<HTMLTextAreaElement, Element>,
    targetInput: string
  ) {
    if (e.target.value === '') {
      setErrorState(targetInput);
    }
  };

  const deleteErrorState = function (targetInput: string) {
    if (errorState === targetInput) {
      setErrorState('');
    }
  };

  return (
    <div className={styles['input-area']}>
      {/* title */}
      <div className={styles['row-area']}>
        <div className={clsx(styles['title-area'], styles['required'])}>
          Event Title
        </div>
        <input
          ref={titleRef}
          placeholder="Title"
          value={title}
          onChange={e => {
            if (e.target.value.length <= 100) {
              setTitle(e.target.value);
            } else {
              handleErrorState('titleLimit');
            }
          }}
          onFocus={() => {
            deleteErrorState('title');
          }}
          onBlur={e => {
            checkInputValid(e, 'title');
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
              <div ref={startRef} className={styles['first-picker']}>
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
                  minTime={
                    isDateEqual(startAt, new Date()) ? new Date() : minZeroTime
                  }
                  maxTime={maxTime}
                />
              </div>
            </div>
          </div>
          <div className={styles['date-row']}>
            <div className={styles['text-area']}>End</div>
            <div className={styles['date-wrapper']}>
              <div ref={endRef} className={styles['first-picker']}>
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
                  minTime={isDateEqual(startAt, endAt) ? startAt : minZeroTime}
                  maxTime={maxTime}
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
              ref={externalLinkRef}
              placeholder="Meeting URL (e.g. Zoom link)"
              value={externalLink}
              onChange={e => {
                if (e.target.value.length < 2000) {
                  setExternalLink(e.target.value);
                } else {
                  handleErrorState('externalLinkLimit');
                }
              }}
              onFocus={() => {
                deleteErrorState('externalLink');
              }}
              onBlur={e => {
                checkInputValid(e, 'externalLink');
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
              {errorState === 'externalLink' ? (
                'Please enter the URL of your event.'
              ) : (
                <div>
                  <div>Please enter the meeting URL between</div>
                  <div>1 and 1999 charachters.</div>
                </div>
              )}
            </div>
          </>
        )}
        {type === 'Offline' && (
          <div style={{position: 'relative', marginBottom: '12px'}}>
            <input
              ref={regionRef}
              placeholder="Offline address"
              value={region}
              onChange={e => {
                if (e.target.value.length < 2000) {
                  setRegion(e.target.value);
                }
              }}
              onFocus={() => {
                deleteErrorState('region');
              }}
              onBlur={e => {
                checkInputValid(e, 'region');
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
              Please enter the address of the event location.!
            </div>
          </div>
        )}
        {type === 'Offline' && (
          <>
            <input
              ref={detailAddressRef}
              placeholder="Detailed address (e.g. Unit 419, Level 4)"
              value={detailAddress}
              onChange={e => {
                if (e.target.value.length < 2000) {
                  setDetailAddress(e.target.value);
                } else {
                  handleErrorState('detailAddressLimit');
                }
              }}
              onFocus={() => {
                deleteErrorState('detailAddress');
              }}
              onBlur={e => {
                checkInputValid(e, 'detailAddress');
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
            ref={handleRef}
            placeholder="Unique ID of your event"
            value={handle}
            onChange={e => {
              changeHandle(e, 'handle');
            }}
            onFocus={() => {
              deleteErrorState('handle');
            }}
            onBlur={e => {
              checkInputValid(e, 'handle');
            }}
            className={clsx([
              {
                [styles['error']]:
                  errorState === 'handle' || errorState === 'handleDuplicate',
                [styles['valid']]: validState === 'handle',
              },
            ])}
          />
          <div
            className={clsx([
              styles['valid-message'],
              {
                [styles['show-valid']]: validState === 'handle',
              },
            ])}
          >
            <Image
              src={'/assets/events/Check.svg'}
              alt="warning"
              width={16}
              height={16}
            />
            {'Available'}
          </div>
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
          ref={descriptionRef}
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
          onFocus={() => {
            deleteErrorState('description');
          }}
          onBlur={e => {
            checkInputValid(e, 'description');
          }}
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
          <div>
            <div>Please enter the event handle between</div>
            <div>2 and 19 characters. Only alphabets and numbers.</div>
          </div>
        </div>
        <div
          className={styles['limit-text']}
        >{`${description.length}/3000`}</div>
      </div>
      {/* image */}
      <div className={clsx([styles['row-area'], styles['image-area']])}>
        <div className={styles['title-area']}>Event Cover image</div>
        <input
          ref={imgFileRef}
          style={{display: 'none'}}
          type="file"
          name="fileUpload"
          id="fileUpload"
          onChange={e => {
            handleImageUpload(e);
          }}
        ></input>
        <div
          className={styles['add-box']}
          style={
            imgUrl
              ? {
                  backgroundImage: `url(${imgUrl})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }
              : {}
          }
        >
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

      {/* modal */}
      {showModal && <SuccessModal handle={handle} />}
    </div>
  );
}
