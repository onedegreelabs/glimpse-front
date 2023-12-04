import glimpseMock from '../../mock/';
import Avatar from '@/app/glimpse-list/components/Avatar/page';
import Image from 'next/image';
import Chip from '@/components/Chip/page';
import styles from './page.module.scss';
import Card from '@/components/Card/page';

export default function List() {
  return (
    <>
      {glimpseMock.glimpses.map(data => (
        <Card key={data.id}>
          <div className={styles['glimpse-list-wrapper']}>
            <div className={styles['card-header']}>
              <img src="/assets/glimpse-list/bookmark-icon.svg" />
            </div>
            <div className={styles['profile-wrapper']}>
              <div>
                <div className={styles['event-info-with-icon-wrapper']}>
                  <Image
                    className={styles['icon']}
                    src="/assets/glimpse-list/location-icon.svg"
                    alt="위치 아이콘"
                    width={24}
                    height={24}
                  />
                  <span>Seoul, Korea</span>
                </div>
                <p className={styles['profile-name']}>{data.name}</p>
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
              </div>
              <Avatar
                src="/assets/glimpse-list/avatar-img.png"
                alt="프로필이미지"
                height={70}
                width={70}
              />
            </div>
            <div>
              <p>{data.text}</p>
            </div>
            <div className={styles['hobby-wrapper']}>
              {data.hobby.map((d: string, index: number) => (
                <Chip
                  key={`hobby-${index}`}
                  label={`#${d}`}
                  backgroundColor="#F3F3F3"
                  borderRadius={30}
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
    </>
  );
}
