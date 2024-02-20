import styles from './eventInfo.module.scss';
import Link from 'next/link';
import IconText from '@/components/iconText/IconText';
import {eventData} from '../mock/mock';
import EventDescription from '../components/eventDescription';

export default function EventInfo() {
  const {eventLink, startDate, tags, location, description} = eventData;

  const dateObj = new Date(startDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}/${month}/${day}`;
  const formattedTime = `${hours}:${minutes} ${
    dateObj.getHours() >= 12 ? 'PM' : 'AM'
  }`;
  const dateText = formattedDate;
  const timeText = formattedTime;

  return (
    <section className={styles['header-content-area']}>
      <section className={styles['event-info-area']}>
        <div className={styles['event-page-link-wrapper']}>
          <Link className={styles['page-link']} href={eventLink}>
            {eventLink}
          </Link>
        </div>
        <div className={styles['event-info-top-wrapper']}>
          <div className={styles['event-date-wrapper']}>
            <IconText
              src={'/assets/glimpse-list/calendar-icon.svg'}
              alt={'달력 아이콘'}
              width={24}
              height={24}
              text={dateText}
            />
            <IconText
              src={'/assets/glimpse-list/clock-icon.svg'}
              alt={'시계 아이콘'}
              width={24}
              height={24}
              text={timeText}
            />
          </div>
          <div>
            <IconText
              src={'/assets/glimpse-list/location-icon.svg'}
              alt={'위치 아이콘'}
              width={24}
              height={24}
              text={location}
            />
          </div>
        </div>
        <div className={styles['tag-wrapper']}>
          {tags.length > 0 &&
            tags.map((tag, i) => {
              return (
                <div key={`tag_${i}`} className={styles['tag-item']}>
                  {`#${tag}`}
                </div>
              );
            })}
        </div>
        <EventDescription description={description} />
      </section>
    </section>
  );
}
