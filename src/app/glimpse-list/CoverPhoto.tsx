import Chip from '@/components/Chip/page';
import styles from './coverPhoto.module.scss';
import Image from 'next/image';

interface CoverPhotoProps {
  eventType: string;
  eventVisibility: string;
  coverImgUrl: string;
  eventTitle: string;
  viewCount: string;
}

export default function CoverPhoto({
  eventType,
  eventVisibility,
  coverImgUrl,
  eventTitle,
  viewCount,
}: CoverPhotoProps) {
  return (
    <div className={styles['event-thumbnail-wrapper']}>
      {/* <Image
        className={styles['event-thumbnail']}
        src={coverImgUrl}
        alt="이벤트 썸네일"
        width={100}
        height={0}
      ></Image> */}
      <img
        className={styles['event-thumbnail']}
        src={coverImgUrl}
        alt="이벤트 썸네일"
      />
      <div className={styles['event-info-wrapper']}>
        <div className={styles['info-header']}>
          <div className={styles['info-type']}>
            <Chip
              label={eventType}
              height={28}
              backgroundColor="#7E51FD"
              borderRadius={4}
            />
            <Chip
              label={eventVisibility}
              height={28}
              backgroundColor="#ffffff4d"
              borderRadius={4}
              isOutline
              soldColor="#e1e1e1"
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
            isOutline
            soldColor="#e1e1e1"
          />
        </div>
      </div>
    </div>
  );
}
