import styles from './eventInfo.module.scss';
import Link from 'next/link';
import IconText from '@/components/iconText/IconText';
import {eventData} from '../mock/mock';
import EventDescription from '../components/EventDescription';
import {getDateTextFromDateObj, getTimeTextFromDateObj} from '@/lib/utils';

export default function EventInfo() {
  const {eventLink, startDate, tags, location, description} = eventData;

  const dateObj = new Date(startDate);
  const dateText = getDateTextFromDateObj(dateObj);
  const timeText = getTimeTextFromDateObj(dateObj);

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
