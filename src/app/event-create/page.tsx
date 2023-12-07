'use client';
import {useState} from 'react';
import styles from './page.module.scss';
import CustomInput from '@/components/custom-input/page';
import CustomRadio from '@/components/custom-radio/page';
import DatePicker from '@/components/date-picker/page';
import clsx from 'clsx';
export default function EventCreate() {
  const [eventTitle, setEventTitle] = useState('');
  const handleEventTitle = function (title: string) {
    setEventTitle(title);
  };
  const eventTypeItems = [
    {text: 'Virtual', value: '0'},
    {text: 'In-person', value: '1'},
    {text: 'Both', value: '2'},
  ];
  const eventVisibilityItems = [
    {text: 'Public', value: '0'},
    {text: 'Private', value: '1'},
  ];
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
              name="Event Type *"
              value={eventTitle}
              items={eventTypeItems}
              handleValue={handleEventTitle}
            />
          </div>
          <div className={styles['event-visibility-radio']}>
            <CustomRadio
              name="Event Visibility *"
              value={eventTitle}
              items={eventVisibilityItems}
              handleValue={handleEventTitle}
            />
          </div>
          <DatePicker />
          <CustomInput
            name="Event Location"
            value={eventLocation}
            handleValue={handleEventTitle}
            placeHolder="Offline location or virtual link"
          />
          <CustomInput
            name="External Event Link"
            value={eventExternalLink}
            handleValue={handleEventTitle}
            placeHolder="http://"
          />
          <CustomInput
            name="Event handle"
            value={eventHandle}
            handleValue={handleEventTitle}
            placeHolder="e.g., unique identifier or name"
          />
          <CustomInput
            name="Event Description"
            value={eventDescription}
            handleValue={handleEventTitle}
            placeHolder="Add a description of your event"
          />
          <CustomInput
            name="Event Tag"
            value={eventTag}
            handleValue={handleEventTitle}
            placeHolder="Tag"
          />
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
