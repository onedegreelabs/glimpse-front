import Avatar from '@/app/glimpse-list/Avatar';
import Chip from '@/components/Chip/page';
import styles from './gridView.module.scss';
import Card from '@/components/Card/page';
import {Glimpse} from './mock/glimpses';
import Link from 'next/link';

// NOTE: list props로 변경하기

interface GridViewProps {
  glimpses: Glimpse[];
}

export default function GridView({glimpses}: GridViewProps) {
  return (
    <div className={styles['glimpse-grid-container']}>
      {glimpses.map((data, index) => (
        <Link key={`profile-card-${index}`} href={'/users/3'}>
          <Card key={index}>
            <div className={styles['glimpse-grid-wrapper']}>
              <div className={styles['card-header']}>
                <img src="/assets/glimpse-list/bookmark-icon.svg" />
              </div>
              <div className={styles['profile-wrapper']}>
                <Avatar
                  src="/assets/glimpse-list/temp-glimpse-list-img.jpg"
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
                    height={28}
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
        </Link>
      ))}
    </div>
  );
}
