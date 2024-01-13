'use client';
import {useEffect, useRef, useState} from 'react';
import styles from './page.module.scss';
import CustomInput from '@/components/custom-input/page';
import CustomRadio from '@/components/custom-radio/page';
import CustomDatePicker from '@/components/date-picker/page';
import clsx from 'clsx';
import Image from 'next/image';
import Card from '@/components/Card/page';
import {createEvent} from '@/network/api';
import CustomTextarea from '@/components/custom-textarea/page';
import _ from 'lodash';

export default function EventCreate() {
  const [eventName, setEventName] = useState('');
  const handleEventTitle = function (name: string) {
    setEventName(name);
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

  const [startDateForRender, setStartDateForRender] = useState<string>('');
  const [timeForRender, setTimeForRender] = useState('');

  useEffect(() => {
    if (startDate) {
      const year = startDate.getFullYear();
      const month = startDate.getMonth() + 1;
      const day = startDate.getDate();
      const formattedDate = `${month}/${day}/${year}`;
      setStartDateForRender(formattedDate);

      const hours = startDate.getHours();
      const minutes = startDate.getMinutes();
      const formattedTime = `${hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
      setTimeForRender(formattedTime);
    }
  }, [startDate]);

  const convertDateFormat = function (date: Date | null) {
    if (date) {
      const formattedDate = date.toISOString().slice(0, 19).replace(' ', 'T');
      return formattedDate;
    } else {
      return '';
    }
  };

  const [eventLocation, seteventLocation] = useState('');
  const handleEventLocation = function (location: string) {
    seteventLocation(location);
  };
  const [eventExternalLink, setEventExternalLink] = useState('');
  const handleEventExternalLink = function (link: string) {
    setEventExternalLink(link);
  };
  const [eventHandle, setEventHandle] = useState('');
  const handleEventHandle = function (handle: string) {
    setEventHandle(handle);
  };
  const [eventDescription, setEventDescription] = useState('');
  const handleEventDescription = function (description: string) {
    setEventDescription(description);
  };
  const [eventTag, setEventTag] = useState<string[]>([]);
  const eventTagRef = useRef<HTMLDivElement>(null);
  const onHandleEventTag = function (e: React.KeyboardEvent<HTMLInputElement>) {
    const inputValue = (e.currentTarget as HTMLInputElement).value;
    const tagsArray = inputValue
      .split(',')
      .map(tag => tag.trim())
      .filter(e => e);
    setEventTag(prev => [...prev, ...tagsArray]);

    if (eventTagRef.current) {
      const eventTagInputElement = eventTagRef.current.querySelector('input');
      if (eventTagInputElement) {
        eventTagInputElement.value = '';
      }
    }
  };

  const onDeleteEventTag = function (idx: number) {
    const copyEventTag = [...eventTag];
    const deletedEventTag = copyEventTag.filter((v, i) => {
      return i !== idx;
    });

    setEventTag(deletedEventTag);
  };

  const [previewMode, setPreviewMode] = useState<string>('desktop');
  const onHandlePreviewMode = function (mode: string) {
    setPreviewMode(mode);
  };

  const [imgFile, setImgFile] = useState<File | undefined>();
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>();

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

  const [profileViewMode, setProfileViewMode] = useState(0);

  const onCreateEvent = async function () {
    const eventTypeText = _.find(eventTypeItems, {value: eventType})?.text;
    const eventVisibilityText = _.find(eventVisibilityItems, {
      value: eventVisibility,
    })?.text;
    const params = {
      organizationId: 1,
      title: eventName,
      type: eventTypeText?.toUpperCase() || '',
      visibility: eventVisibilityText?.toUpperCase() || '',
      startDate: convertDateFormat(startDate),
      endDate: convertDateFormat(endDate),
      location: eventLocation,
      link: eventExternalLink,
      handle: eventHandle,
      description: eventDescription,
      tags: eventTag,
    };
    await createEvent(imgFile, params);
  };

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const textareaElement = descriptionRef.current.querySelector('textarea');
      if (textareaElement !== null) {
        const heightValue = textareaElement.scrollHeight;
        textareaElement.style.height = heightValue + 'px';
        descriptionRef.current.style.height = heightValue + 20 + 'px';
      }
    }
  }, [eventDescription]);

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
                    ? '/icons/phone_inactive.svg'
                    : '/icons/phone_active.svg'
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
                    ? '/icons/desktop_inactive.svg'
                    : '/icons/desktop_active.svg'
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
                src="/icons/notification.svg"
                width={24}
                height={24}
              />
            </div>
            <div className={styles['icon-area']}>
              <Image alt="icon" src="/icons/menu.svg" width={24} height={24} />
            </div>
          </div>
        </div>

        <div
          className={styles['event-info-header']}
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

          <div className={styles['event-name-area']}>
            {eventName.length ? eventName : 'eventName'}
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
                  src="/icons/calendar.svg"
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles['text-area']}>{startDateForRender}</div>
            </div>
            <div className={styles['item-area']}>
              <div className={styles['icon-area']}>
                <Image
                  alt="icon"
                  src="/icons/clock.svg"
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles['text-area']}>{timeForRender}</div>
            </div>
            <div className={styles['item-area']}>
              <div className={styles['icon-area']}>
                <Image
                  alt="icon"
                  src="/icons/location.svg"
                  width={16}
                  height={16}
                />
              </div>
              <div className={styles['text-area']}>
                {eventLocation.length ? eventLocation : 'Location'}
              </div>
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
                src="/icons/caretRight.svg"
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
                src="/icons/search.svg"
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
                    ? '/icons/union_ver1_active.svg'
                    : '/icons/union_ver1_inactive.svg'
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
                    ? '/icons/union_ver2_active.svg'
                    : '/icons/union_ver2_inactive.svg'
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
                    ? '/icons/union_ver3_active.svg'
                    : '/icons/union_ver3_inactive.svg'
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
                src="/icons/arrowDown_active.svg"
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
                      src="/icons/arrowDown_inactive.svg"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>

        <div
          className={clsx(styles['profile-card-wrapper'], {
            [styles['mobile']]: previewMode === 'mobile',
          })}
        >
          {[...Array(previewMode === 'mobile' ? 2 : 6)].map((v, i) => {
            return (
              <Card key={`card_${i}`}>
                <div className={styles['profile-card']}>
                  <div className={styles['card-header']}>
                    <div className={styles['icon-wrapper']}>
                      <Image
                        alt="icon"
                        src="/icons/bookmark.svg"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div
                      className={clsx(
                        styles['icon-wrapper'],
                        styles['circle-bg']
                      )}
                    >
                      <Image
                        alt="icon"
                        src="/icons/comment.svg"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className={styles['main-info']}>
                    <div className={styles['info-content']}>
                      <div className={styles['info-location']}>
                        <div className={styles['icon-wrapper']}>
                          <Image
                            alt="icon"
                            src="/icons/location.svg"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className={styles['text-area']}>
                          San Fancisco, USA
                        </div>
                      </div>
                      <div className={styles['info-name']}>{`sample user${
                        i + 1
                      }`}</div>
                      <div className={styles['info-position']}>
                        <div
                          className={clsx(
                            styles['position-tag'],
                            styles['active']
                          )}
                        >
                          Product
                        </div>
                        <div className={styles['position-tag']}>CPO</div>
                      </div>
                    </div>
                    <div className={styles['profile-image']}>
                      <Image
                        alt="icon"
                        src="/icons/profile_image.jpg"
                        width={64}
                        height={64}
                      />
                    </div>
                  </div>
                  <div className={styles['tmp-classname']}>
                    {`Hi, I am sample user${i + 1}. Glimpse!`}
                  </div>
                  <div className={styles['tag-info']}>
                    <div className={styles['tag-item']}>#puppylove</div>
                    <div className={styles['tag-item']}>#coding</div>
                    <div className={styles['tag-item']}>#k-pop</div>
                  </div>
                  <div className={styles['sns-channel']}>
                    <div className={styles['icon-wrapper']}>
                      <Image
                        alt="icon"
                        src="/icons/github_icon.jpg"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className={styles['icon-wrapper']}>
                      <Image
                        alt="icon"
                        src="/icons/instagram_icon.svg"
                        width={32}
                        height={32}
                      />
                    </div>
                    <div className={styles['icon-wrapper']}>
                      <Image
                        alt="icon"
                        src="/icons/link_icon.svg"
                        width={32}
                        height={32}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
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
            name="Event Name *"
            value={eventName}
            handleValue={handleEventTitle}
            placeHolder="Name"
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
          <div ref={descriptionRef}>
            <CustomTextarea
              name="Event Description"
              value={eventDescription}
              handleValue={handleEventDescription}
              placeHolder="Add a description of your event"
            />
          </div>
          <div ref={eventTagRef}>
            <CustomInput
              name="Event Tag"
              valueArr={eventTag}
              placeHolder="Tag"
              handleEnter={e => {
                onHandleEventTag(e);
              }}
            />
          </div>
          {eventTag.length > 0 && (
            <div className={styles['event-tag-items']}>
              {eventTag.map((v, i) => {
                return (
                  <div className={styles['tag-item']} key={`tag_${i}`}>
                    <div className={styles['text-area']}>{v}</div>
                    <div
                      className={styles['btn-area']}
                      onClick={() => {
                        onDeleteEventTag(i);
                      }}
                    >
                      x
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles['bg-file-area']}>
            <div className={styles['text-area']}>Event Cover Image</div>
            <div
              className={styles['file-area']}
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
              <label htmlFor="fileUpload" className={styles['label-button']}>
                <Image
                  alt="icon"
                  src="/icons/fileUpload.svg"
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
          <div className={styles['footer-area']}>
            <div className={clsx(styles['button-area'], styles['save-button'])}>
              <div className={styles['text-area']}>Save Draft</div>
            </div>
            <div
              className={clsx(styles['button-area'], styles['publish-button'])}
              onClick={() => {
                onCreateEvent();
              }}
            >
              <div className={styles['text-area']}>Publish & Share</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
