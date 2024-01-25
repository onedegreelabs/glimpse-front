import Avatar from '@/app/glimpse-list/Avatar';
import Chip from '@/components/Chip/page';
import styles from './boxView.module.scss';
import Card from '@/components/Card/page';
import IconText from '@/components/IconText/page';
import Link from 'next/link';
import {userData} from './type';
import Image from 'next/image';
import clsx from 'clsx';
interface BoxProps {
  userList: userData[];
}

export default function BoxView({userList}: BoxProps) {
  return (
    <>
      {userList.map((data, index) => (
        // <Link key={`profile-card-${index}`} href={'/users/3'}>
        <Card key={data.id}>
          <div className={styles['glimpse-list-wrapper']}>
            <div className={styles['card-header']}>
              <div className={styles['icon-wrapper']}>
                <Image
                  alt="bookmark-icon"
                  src={'icons/bookmark-icon.svg'}
                  width={24}
                  height={24}
                />
              </div>
              <div
                className={clsx(styles['icon-wrapper'], styles['comment-icon'])}
              >
                <Image
                  alt="chat-icon"
                  src={'icons/comment.svg'}
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className={styles['profile-wrapper']}>
              <div>
                <IconText
                  src={'/assets/glimpse-list/location-icon.svg'}
                  alt={'위치 아이콘'}
                  width={24}
                  height={24}
                  text={'Seoul, Korea'}
                  fontsize={12}
                  gap={4}
                />
                <p className={styles['profile-name']}>{data.displayName}</p>
                <div className={styles['position-wrapper']}>
                  <Chip
                    key={index}
                    label={data.department}
                    height={28}
                    backgroundColor={index === 0 ? '#C1AEF6' : '#F3F3F3'}
                    borderRadius={4}
                    fontSize={12}
                    fontWeight={600}
                  />
                </div>
              </div>
              <Avatar
                src="/assets/glimpse-list/temp-glimpse-list-img.jpg"
                alt="프로필이미지"
                height={70}
                width={70}
              />
            </div>
            <div className={styles['intro-snippet']}>
              <p>{data.introSnippet}</p>
            </div>
            <div className={styles['hobby-wrapper']}>
              {data.cards[4].content.map((d: string, index: number) => (
                <Chip
                  key={`hobby-${index}`}
                  label={`#${d}`}
                  height={24}
                  backgroundColor="#F3F3F3"
                  borderRadius={30}
                  fontSize={12}
                  fontWeight={600}
                />
              ))}
            </div>
            <div className={styles['link-wrapper']}>
              {data.cards[3].content.map((_, index: number) => (
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
        // </Link>
      ))}
    </>
  );
}
