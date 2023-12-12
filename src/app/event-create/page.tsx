'use client';
import {useEffect, useState} from 'react';
import styles from './page.module.scss';
import CustomInput from '@/components/custom-input/page';
import CustomRadio from '@/components/custom-radio/page';
import CustomDatePicker from '@/components/date-picker/page';
import clsx from 'clsx';
import Image from 'next/image';
export default function EventCreate() {
  const [eventTitle, setEventTitle] = useState('');
  const handleEventTitle = function (title: string) {
    setEventTitle(title);
  };

  const [eventType, setEventType] = useState(0);
  const eventTypeItems = [
    {text: 'Virtual', value: 0},
    {text: 'In-person', value: 1},
    {text: 'Both', value: 2},
  ];
  const [eventTypeText, setEventTypeText] = useState('Virtual');
  useEffect(() => {
    const getTextFromValue = function (valueToFind: number) {
      const foundItem = eventTypeItems.find(item => item.value === valueToFind);
      return foundItem ? foundItem.text : 'Not found';
    };
    const text = getTextFromValue(eventType);
    setEventTypeText(text);
  }, [eventType]);
  const handleEventType = function (type: number) {
    setEventType(type);
  };

  const [eventVisibility, setEventVisibility] = useState(0);
  const eventVisibilityItems = [
    {text: 'Public', value: 0},
    {text: 'Private', value: 1},
  ];
  const [eventVisibilityText, seteventVisibilityText] = useState('Public');
  useEffect(() => {
    const getTextFromValue = function (valueToFind: number) {
      const foundItem = eventVisibilityItems.find(
        item => item.value === valueToFind
      );
      return foundItem ? foundItem.text : 'Not found';
    };
    const text = getTextFromValue(eventVisibility);
    seteventVisibilityText(text);
  }, [eventVisibility]);

  const handleEventVisibility = function (type: number) {
    setEventVisibility(type);
  };

  const day = new Date();
  const nextDay = new Date();
  nextDay.setDate(day.getDate() + 1);
  const [startDate, setStartDate] = useState<Date | null>(day);
  const [endDate, setEndDate] = useState<Date | null>(nextDay);

  const [eventLocation, seteventLocation] = useState('');
  const handleEventLocation = function (title: string) {
    seteventLocation(title);
  };
  const [eventExternalLink, setEventExternalLink] = useState('');
  const handleEventExternalLink = function (title: string) {
    setEventExternalLink(title);
  };
  const [eventHandle, setEventHandle] = useState('');
  const handleEventHandle = function (title: string) {
    setEventHandle(title);
  };
  const [eventDescription, setEventDescription] = useState('');
  const handleEventDescription = function (title: string) {
    setEventDescription(title);
  };
  const [eventTag, setEventTag] = useState('');
  const handleEventTag = function (title: string) {
    setEventTag(title);
  };

  const [previewMode, setPreviewMode] = useState<string>('desktop');
  const onHandlePreviewMode = function (mode: string) {
    setPreviewMode(mode);
  };

  const [imgFile, setImgFile] = useState();
  const [imgUrl, setImgUrl] = useState();
  const handleImageUpload = (event: {target: {files: any[]}}) => {
    const selectedFile = event.target.files[0];

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

  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);

  const [profileViewMode, setProfileViewMode] = useState(0);

  return (
    <div className={styles['event-create-wrapper']}>
      <div className={clsx(styles['preview-area'], styles[previewMode])}>
        <div className={styles['header-area']}>
          <div className={styles['url-area']}>
            <div className={styles['text-area']}>
              {eventHandle.length
                ? eventHandle
                : 'https://glimpse.com/event/perfect'}
            </div>
          </div>
          <div className={styles['button-area']}>
            <div
              className={clsx(styles['preview-button'], styles['left'], {
                [styles['active']]: previewMode === 'mobile',
              })}
              onClick={() => {
                onHandlePreviewMode('mobile');
              }}
            >
              <Image
                alt="icon"
                src={
                  previewMode === 'desktop'
                    ? '/icons/phone_inactive.png'
                    : '/icons/phone_active.png'
                }
                width={20}
                height={20}
              />
            </div>
            <div
              className={clsx(styles['preview-button'], styles['right'], {
                [styles['active']]: previewMode === 'desktop',
              })}
              onClick={() => {
                onHandlePreviewMode('desktop');
              }}
            >
              <Image
                alt="icon"
                src={
                  previewMode === 'mobile'
                    ? '/icons/desktop_inactive.png'
                    : '/icons/desktop_active.png'
                }
                width={20}
                height={20}
              />
            </div>
            <div className={styles['']}></div>
            <div className={styles['']}></div>
          </div>
        </div>

        <div className={styles['preview-header']}>
          <div className={styles['text-area']}>Hi, James 👋</div>
          <div className={styles['icon-wrapper']}>
            <div className={styles['icon-area']}>
              <Image
                alt="icon"
                src="/icons/notification.png"
                width={24}
                height={24}
              />
            </div>
            <div className={styles['icon-area']}>
              <Image alt="icon" src="/icons/menu.png" width={24} height={24} />
            </div>
          </div>
        </div>

        <div
          className={styles['event-info-header']}
          style={imgUrl ? {backgroundImage: `url(${imgUrl})`} : {}}
        >
          <div className={styles['header-area']}>
            <div className={styles['radio-items']}>
              <div className={styles['item-area']}>
                <div className={styles['text-area']}>{eventTypeText}</div>
              </div>
              <div className={styles['item-area']}>
                <div className={styles['text-area']}>{eventVisibilityText}</div>
              </div>
            </div>
          </div>

          <div className={styles['event-title-area']}>
            {eventTitle.length ? eventTitle : 'eventTitle'}
          </div>

          <div className={styles['view-area']}>
            <div className={styles['view-item']}>
              <div className={styles['text-area']}>total view 0</div>
            </div>
            <div className={styles['view-item']}>
              <div className={styles['text-area']}>total view 0</div>
            </div>
            <div className={styles['view-item']}>
              <div className={styles['text-area']}>total view 0</div>
            </div>
          </div>
        </div>

        <div className={styles['main-content-container']}>
          <div className={styles['time-location-wrapper']}>
            <div className={styles['item-area']}>
              <div className={styles['icon-area']}>
                <Image
                  alt="icon"
                  src="/icons/calendar.png"
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles['text-area']}>00/00/0000</div>
            </div>
            <div className={styles['item-area']}>
              <div className={styles['icon-area']}>
                <Image
                  alt="icon"
                  src="/icons/clock.png"
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles['text-area']}>12:00</div>
            </div>
            <div className={styles['item-area']}>
              <div className={styles['icon-area']}>
                <Image
                  alt="icon"
                  src="/icons/location.png"
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles['text-area']}>Location</div>
            </div>
          </div>
          <div className={styles['event-description-wrapper']}>
            {eventDescription.length ? eventDescription : 'eventDescription'}
          </div>
          <div className={styles['extenral-event-link-wrapper']}>
            <div className={styles['text-area']}>
              {eventExternalLink.length
                ? eventExternalLink
                : 'eventExternalLink'}
            </div>
            <div className={styles['icon-area']}>
              <Image
                alt="icon"
                src="/icons/caretRight.png"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>

        <div className={styles['border-line']} />

        <div className={styles['profile-header']}>
          <div className={styles['search-area']}>
            <div className={styles['icon-wrapper']}>
              <Image
                alt="icon"
                src="/icons/search.png"
                width={24}
                height={24}
              />
            </div>
            <div className={styles['text-area']}>Search</div>
          </div>
          <div className={styles['view-mode-area']}>
            <div
              className={styles['icon-wrapper']}
              onClick={() => {
                setProfileViewMode(0);
              }}
            >
              <Image
                alt="icon"
                src={
                  profileViewMode === 0
                    ? '/icons/union_ver1_active.png'
                    : '/icons/union_ver1_inactive.png'
                }
                width={24}
                height={24}
              />
            </div>
            <div
              className={styles['icon-wrapper']}
              onClick={() => {
                setProfileViewMode(1);
              }}
            >
              <Image
                alt="icon"
                src={
                  profileViewMode === 1
                    ? '/icons/union_ver2_active.png'
                    : '/icons/union_ver2_inactive.png'
                }
                width={24}
                height={24}
              />
            </div>
            <div
              className={styles['icon-wrapper']}
              onClick={() => {
                setProfileViewMode(2);
              }}
            >
              <Image
                alt="icon"
                src={
                  profileViewMode === 2
                    ? '/icons/union_ver3_active.png'
                    : '/icons/union_ver3_inactive.png'
                }
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        <div className={styles['filter-area']}>
          <div className={clsx(styles['item-area'], styles['active'])}>
            <div className={styles['text-area']}>all</div>
            <div className={styles['icon-wrapper']}>
              <Image
                alt="icon"
                src="/icons/arrowDown_active.png"
                width={24}
                height={24}
              />
            </div>
          </div>

          {['industry', 'hobby', 'interest', 'favorite', 'bookmarks'].map(
            (v, i) => {
              return (
                <div className={styles['item-area']} key={`item-${i}`}>
                  <div className={styles['text-area']}>{v}</div>
                  <div className={styles['icon-wrapper']}>
                    <Image
                      alt="icon"
                      src="/icons/arrowDown_inactive.png"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

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
              name="Event Type *"
              value={eventType}
              items={eventTypeItems}
              handleValue={handleEventType}
            />
          </div>
          <div className={styles['event-visibility-radio']}>
            <CustomRadio
              name="Event Visibility *"
              value={eventVisibility}
              items={eventVisibilityItems}
              handleValue={handleEventVisibility}
            />
          </div>
          <CustomDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <CustomInput
            name="Event Location"
            value={eventLocation}
            handleValue={handleEventLocation}
            placeHolder="Offline location or virtual link"
          />
          <CustomInput
            name="External Event Link"
            value={eventExternalLink}
            handleValue={handleEventExternalLink}
            placeHolder="http://"
          />
          <CustomInput
            name="Event handle"
            value={eventHandle}
            handleValue={handleEventHandle}
            placeHolder="e.g., unique identifier or name"
          />
          <CustomInput
            name="Event Description"
            value={eventDescription}
            handleValue={handleEventDescription}
            placeHolder="Add a description of your event"
          />
          <CustomInput
            name="Event Tag"
            value={eventTag}
            handleValue={handleEventTag}
            placeHolder="Tag"
          />
          <div className={styles['bg-file-area']}>
            <div className={styles['text-area']}>Event Cover Image</div>
            <div
              className={styles['file-area']}
              style={imgUrl ? {backgroundImage: `url(${imgUrl})`} : {}}
            >
              <label htmlFor="fileUpload" className={styles['label-button']}>
                <Image
                  alt="icon"
                  src="/icons/fileUpload.png"
                  width={20}
                  height={20}
                />
                {imgUrl ? 'reset' : 'Add Cover'}
              </label>
              <input
                style={{display: 'none'}}
                type="file"
                name="fileUpload"
                id="fileUpload"
                onChange={handleImageUpload}
              ></input>
            </div>
          </div>
        </div>
        <div className={styles['footer-area']}>
          <div className={clsx(styles['button-area'], styles['save-button'])}>
            <div className={styles['text-area']}>Save Draft</div>
          </div>
          <div
            className={clsx(styles['button-area'], styles['publish-button'])}
          >
            <div className={styles['text-area']}>Publish & Share</div>
          </div>
        </div>
      </div>
    </div>
  );
}
