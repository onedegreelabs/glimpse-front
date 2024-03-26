import Chip from '@/components/chip/Chip';
import styles from './topBanner.module.scss';
import Image from 'next/image';
import {eventData} from '../mock/mock';

export default function TopBanner({
  viewCount,
  eventType,
  eventTitle,
  coverImage,
}: {
  viewCount: number;
  eventType: string;
  eventTitle: string;
  coverImage: File | string | null;
}) {
  const {coverImgUrl} = eventData;

  return (
    <div className={styles['event-thumbnail-wrapper']}>
      {coverImage && (
        <Image
          className={styles['event-thumbnail']}
          src={coverImgUrl}
          alt="이벤트 썸네일"
          width={100}
          height={40}
        />
      )}
      <div className={styles['event-info-wrapper']}>
        <div className={styles['info-header']}>
          <div className={styles['info-type']}>
            <Chip
              label={eventType}
              height={28}
              backgroundColor="#7E51FD"
              borderRadius={4}
              color="#fff"
              fontSize={12}
            />
            {/* <Chip
              label={eventVisibility}
              height={28}
              backgroundColor="#ffffff4d"
              borderRadius={4}
              isOutline
              soldColor="#e1e1e1"
            /> */}
          </div>
          <div className={styles['share-btn-wrapper']}>
            <Image
              alt="share-icon"
              src="/icons/shareBox.svg"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className={styles['info-middle']}>
          <p>{eventTitle}</p>
        </div>
        <div className={styles['info-bottom']}>
          <Chip
            label={`total view ${viewCount}`}
            height={24}
            backgroundColor="#ffffff4d"
            borderRadius={4}
            fontSize={12}
          />
        </div>
      </div>
    </div>
  );
}
