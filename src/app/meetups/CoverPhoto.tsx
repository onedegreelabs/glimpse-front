import Chip from '@/components/chip/Chip';
import styles from './coverPhoto.module.scss';
import Image from 'next/image';

interface CoverPhotoProps {
  eventType: string;
  coverImgUrl: string;
  eventTitle: string;
  viewCount: string;
  eventHandleLink: string;
}

export default function CoverPhoto({
  eventType,
  coverImgUrl,
  eventTitle,
  viewCount,
  eventHandleLink,
}: CoverPhotoProps) {
  const onClickShare = function () {
    copyToClipboard(eventHandleLink || '');
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div className={styles['event-thumbnail-wrapper']}>
      {/* <Image
        className={styles['event-thumbnail']}
        src={coverImgUrl}
        alt="이벤트 썸네일"
        width={100}
        height={0}
      ></Image> */}
      {coverImgUrl && (
        <img
          className={styles['event-thumbnail']}
          src={coverImgUrl}
          alt="이벤트 썸네일"
        />
      )}
      <div className={styles['event-info-wrapper']}>
        <div className={styles['info-header']}>
          <div className={styles['info-type']}>
            {eventType && (
              <Chip
                label={eventType}
                height={28}
                backgroundColor="#7E51FD"
                borderRadius={4}
              />
            )}
          </div>
          <div className={styles['share-btn-wrapper']} onClick={onClickShare}>
            <Image
              alt="share-icon"
              src="/icons/shareBox.svg"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className={styles['info-middle']}>
          <p>{eventTitle}</p>
        </div>
        <div className={styles['info-bottom']}>
          {viewCount && (
            <Chip
              label={`total view ${viewCount}`}
              height={24}
              backgroundColor="#ffffff4d"
              borderRadius={4}
              isOutline
              soldColor="#e1e1e1"
              padding={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 16,
                paddingBottom: 16,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
