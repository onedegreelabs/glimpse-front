import glimpseMock from '../../mock/';
import Avatar from '@/app/glimpse-list/components/Avatar/page';
import Image from 'next/image';
import Chip from '@/components/Chip/page';
import styles from './page.module.scss';
import Card from '@/components/Card/page';

// NOTE: list props로 변경하기

export default function Grid() {
  return (
    <div className={styles['glimpse-grid-container']}>
      {glimpseMock.glimpses.map((data, index) => (
        <Card key={index}>
          <div className={styles['glimpse-grid-wrapper']}>
            <div className={styles['card-header']}>
              <img src="/assets/glimpse-list/bookmark-icon.svg" />
            </div>
            <div className={styles['profile-wrapper']}>
              <Avatar
                src="/assets/glimpse-list/avatar-img.png"
                alt="프로필이미지"
                height={70}
                width={70}
              />
              <p className={styles['profile-name']}>{data.name}</p>
            </div>
            <div className={styles['position-wrapper']}>
              {data.position.map((d: string, index: number) => (
                <Chip
                  key={index}
                  label={d}
                  backgroundColor={index === 0 ? '#C1AEF6' : '#F3F3F3'}
                  borderRadius={4}
                />
              ))}
            </div>
            <div></div>
          </div>
        </Card>
      ))}
    </div>
  );
}
