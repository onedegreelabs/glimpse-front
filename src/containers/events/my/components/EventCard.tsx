import Card from '@/components/card/Card';
import styles from './eventCard.module.scss';
import testImg from '../test.jpg';
import Image from 'next/image';
import IconText from '@/components/iconText/IconText';
import TestHostImg from '@/../public/icons/profile_image.jpg';
import PersonIcon from '@/../public/icons/person_icon.svg';
export default function EventCard() {
  return (
    <Card>
      <div className={styles['event-card-wrapper']}>
        <div className={styles['image-box']}>
          <Image src={testImg} alt={'event-image'} />
        </div>

        <div className={styles['right-area']}>
          <div className={styles['event-title']}>
            Hi Sunday Party in Gangnam
          </div>

          <div className={styles['time-and-location']}>
            <IconText
              src={'/assets/glimpse-list/clock-icon.svg'}
              alt={'달력 아이콘'}
              width={24}
              height={24}
              gap={2}
              text={'1:00PM'}
              fontsize={12}
            />
            <IconText
              src={'/assets/glimpse-list/location-icon.svg'}
              alt={'위치 아이콘'}
              width={24}
              height={24}
              gap={2}
              text={'Gangnam Seoul'}
              fontsize={12}
            />
          </div>

          <div className={styles['people-info']}>
            <div className={styles['host-area']}>
              <div className={styles['host-img-box']}>
                <Image src={TestHostImg} alt="host-profile-img" />
              </div>
              <div className={styles['']}>By Claire Jeong</div>
            </div>
            <div className={styles['participant-area']}>
              <Image src={PersonIcon} alt="person-icon" />
              <div className={styles['']}>23/23</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
