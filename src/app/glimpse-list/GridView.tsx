import Avatar from '@/app/glimpse-list/Avatar';
import Chip from '@/components/Chip/page';
import styles from './gridView.module.scss';
import Card from '@/components/Card/page';
import {userData} from './type';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

// NOTE: list props로 변경하기

interface GridViewProps {
  userList: userData[];
}

export default function GridView({userList}: GridViewProps) {
  const srcList = [
    '/assets/favicon/facebook.jpg',
    '/assets/favicon/github.jpg',
    '/assets/favicon/instagram.jpg',
    '/assets/favicon/linkedin.jpg',
    '/assets/favicon/instagram.jpg',
    '/assets/favicon/dribble.jpg',
    '/assets/favicon/medium.jpg',
  ];
  const colorList = ['#C1AEF6', '#F3F3F3', '#f08686', '#86f0e7', '#f8eb74'];
  return (
    <div className={styles['grid-view-wrapper']}>
      {userList.map((data, index) => (
        <Link key={`profile-card-${index}`} href={'/users/3'}>
          <Card key={index}>
            <div className={styles['glimpse-grid-wrapper']}>
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
                  className={clsx(
                    styles['icon-wrapper'],
                    styles['comment-icon']
                  )}
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
                <Avatar
                  src={
                    data.profileImageUrl ??
                    '/assets/glimpse-list/temp-glimpse-list-img.jpg'
                  }
                  alt="프로필이미지"
                  height={40}
                  width={40}
                />
                <p className={styles['profile-name']}>{data.displayName}</p>
              </div>
              <div className={styles['position-wrapper']}>
                <Chip
                  key={index}
                  label={data.department}
                  height={28}
                  backgroundColor={colorList[Math.floor(Math.random() * 5)]}
                  borderRadius={4}
                />
              </div>
              <div className={styles['link-wrapper']}>
                {data.cards[3].content.map((_, index: number) => (
                  <Image
                    key={`link_${index}`}
                    src={srcList[Math.floor(Math.random() * 7)]}
                    alt={'img'}
                    width={32}
                    height={32}
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
