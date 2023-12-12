import Avatar from '@/app/glimpse-list/components/Avatar/page';
import Image from 'next/image';
import Chip from '@/components/Chip/page';
import styles from './page.module.scss';
import Card from '@/components/Card/page';
import {Glimpse} from '../../mock/glimpses';

// NOTE: list props로 변경하기

interface GridProps {
  glimpses: Glimpse[];
}

export default function Grid({glimpses}: GridProps) {
  return (
    <div className={styles['glimpse-grid-container']}>
      {glimpses.map((data, index) => (
        <Card key={index}>
          <div className={styles['glimpse-grid-wrapper']}>
            <div className={styles['card-header']}>
              <img src="/assets/glimpse-list/bookmark-icon.svg" />
            </div>
            <div className={styles['profile-wrapper']}>
              <Avatar
                src="/assets/glimpse-list/avatar-img.png"
                alt="프로필이미지"
                height={40}
                width={40}
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
            <div className={styles['link-wrapper']}>
              {data.link.map((_, index: number) => (
                <div
                  key={`link_${index}`}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F3F3F3',
                  }}
                />
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
