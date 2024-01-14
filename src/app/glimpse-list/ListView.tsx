import Avatar from '@/app/glimpse-list/Avatar';
import Chip from '@/components/Chip/page';
import styles from './listView.module.scss';
import Card from '@/components/Card/page';
import {Glimpse} from './mock/glimpses';
import Link from 'next/link';

interface ListViewProps {
  glimpses: Glimpse[];
}

export default function ListView({glimpses}: ListViewProps) {
  return (
    <>
      {glimpses.map((data, index) => (
        <Link key={`profile-card-${index}`} href={'/users/3'}>
          <Card key={data.id}>
            <div className={styles['glimpse-compact-wrapper']}>
              <div className={styles['left-wrapper']}>
                <div className={styles['profile-wrapper']}>
                  <Avatar
                    src="/assets/glimpse-list/temp-glimpse-list-img.jpg"
                    alt="프로필이미지"
                    height={50}
                    width={50}
                  />
                  <div className={styles['profile-info-wrapper']}>
                    <p className={styles['profile-name']}>{data.name}</p>
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
                  </div>
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
              <div className={styles['right-wrapper']}>
                <img src="/assets/glimpse-list/bookmark-icon.svg" />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
}
