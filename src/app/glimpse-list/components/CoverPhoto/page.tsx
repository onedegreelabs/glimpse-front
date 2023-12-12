import Chip from '@/components/Chip/page';
import styles from './page.module.scss';

export default function CoverPhoto() {
  return (
    <div className={styles['event-thumbnail-wrapper']}>
      <img
        className={styles['event-thumbnail']}
        src="/assets/glimpse-list/temp-glimpse-list-img.jpg"
        alt="이벤트 썸네일"
      />
      <div className={styles['event-info-wrapper']}>
        <div className={styles['info-header']}>
          <div className={styles['info-type']}>
            <Chip label="virtual" backgroundColor="#7E51FD" borderRadius={4} />
            <Chip
              label="Private"
              backgroundColor="#ffffff4d"
              borderRadius={4}
              isOutline
              soldColor="#e1e1e1"
            />
          </div>
        </div>
        <div className={styles['info-middle']}>
          <p>Winter 2023 Party in NYC</p>
        </div>
        <div className={styles['info-bottom']}>
          <Chip
            label="total view 179"
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
