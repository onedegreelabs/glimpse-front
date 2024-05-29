import Card from '@/components/card/Card';
import styles from './eventCard.module.scss';
import Image from 'next/image';
import IconText from '@/components/iconText/IconText';
import {EventDataType} from '@/types/eventTypes';
import {useRouter} from 'next/navigation';
import {EventDataType2} from '@/types/rocketTypes';

export default function EventCard({
  eventData,
  pageType,
}: {
  eventData: EventDataType2;
  pageType: string;
}) {
  const makeTimeText = (dateTimeString: Date) => {
    const date = new Date(dateTimeString);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  };
  const startTime = makeTimeText(eventData?.startAt) || '';

  // const makeLocationText = () => {
  //   if (eventData.type === 'Online') {
  //     return eventData.externalLink;
  //   } else {
  //     const regionArr = eventData.region;
  //     return `${regionArr.twoDepth} ${regionArr.threeDepth} ${eventData.detailAddress}`;
  //   }
  // };
  // const locationText = makeLocationText();

  const locationText = eventData.location.shortAddress;

  // const makeOrganizerText = () => {
  //   const organizer = eventData?.organizer;
  //   if (organizer.givenName || organizer.familyName) {
  //     const organizerName =
  //       organizer.givenName &&
  //       organizer.givenName + organizer.familyName &&
  //       organizer.familyName;
  //     return organizerName;
  //   } else return 'there is no host';
  // };
  // const organizerText = makeOrganizerText();
  const organizerText = eventData.organizers[0].name;

  const router = useRouter();
  const resUrl = window.location.href;
  const onClickCard = (handle: string) => {
    const eventDetailUrl =
      pageType === 'my'
        ? resUrl.replace(/\/my$/, `/${handle}`)
        : resUrl.replace(/\/discover$/, `/${handle}`);
    router.push(eventDetailUrl);
  };

  return (
    <Card>
      <div
        className={styles['event-card-wrapper']}
        onClick={() => {
          onClickCard(eventData.handle);
        }}
      >
        <div className={styles['image-box']}>
          <Image
            src={eventData.coverImage}
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
                  src={
                    eventData.organizers[0].profileImage
                      ? eventData.organizers[0].profileImage
                      : '/icons/profile_image.svg'
                  }
                  alt="host-profile-img"
                  width={12}
                  height={12}
                />
              </div>
              <div className={styles['']}>{organizerText}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
