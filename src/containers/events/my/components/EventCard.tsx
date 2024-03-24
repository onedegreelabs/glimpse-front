import Card from '@/components/card/Card';
import styles from './eventCard.module.scss';
import Image from 'next/image';
import IconText from '@/components/iconText/IconText';
import {EventDataType} from '@/types/eventTypes';

export default function EventCard({eventData}: {eventData: EventDataType}) {
  const makeTimeText = (dateTimeString: Date) => {
    const date = new Date(dateTimeString);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  };
  const startTime = makeTimeText(eventData?.startAt) || '';

  const makeLocationText = () => {
    if (eventData.type === 'Online') {
      return eventData.externalLink;
    } else {
      const regionArr = eventData.region;
      return `${regionArr.twoDepth} ${regionArr.threeDepth} ${eventData.detailAddress}`;
    }
  };
  const locationText = makeLocationText();

  const makeOrganizerText = () => {
    const organizer = eventData?.organizer;
    if (organizer.givenName || organizer.familyName) {
      const organizerName =
        organizer.givenName &&
        organizer.givenName + organizer.familyName &&
        organizer.familyName;
      return organizerName;
    } else return 'there is no host';
  };
  const organizerText = makeOrganizerText();

  return (
    <Card>
      <div className={styles['event-card-wrapper']}>
        <div className={styles['image-box']}>
          <Image
            src="/assets/events/test.jpg"
            alt={'event-image'}
            width={200}
            height={200}
          />
        </div>

        <div className={styles['right-area']}>
          <div className={styles['event-title']}>{eventData.title}</div>

          <div className={styles['time-and-location']}>
            <IconText
              src={'/assets/glimpse-list/clock-icon.svg'}
              alt={'달력 아이콘'}
              width={24}
              height={24}
              gap={2}
              text={startTime}
              fontsize={12}
            />
            <div className={styles['location-area']}>
              <IconText
                src={'/assets/glimpse-list/location-icon.svg'}
                alt={'위치 아이콘'}
                width={24}
                height={24}
                gap={2}
                text={locationText}
                fontsize={12}
              />
            </div>
          </div>

          <div className={styles['people-info']}>
            <div className={styles['host-area']}>
              <div className={styles['host-img-box']}>
                <Image
                  src={'/icons/profile_image.jpg'}
                  alt="host-profile-img"
                  width={12}
                  height={12}
                />
              </div>
              <div className={styles['']}>{organizerText}</div>
            </div>
            <div className={styles['participant-area']}>
              <Image
                src={'/icons/person_icon.svg'}
                alt="person-icon"
                width={14}
                height={14}
              />
              <div className={styles['']}>23/23</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
