import Avatar from '@/app/glimpse-list/Avatar';
import Chip from '@/components/ui/chip';
import styles from './listView.module.scss';
import Card from '@/components/ui/card';
import {userData} from './type';
import Image from 'next/image';
import clsx from 'clsx';
import {useRouter} from 'next/navigation';

interface ListViewProps {
  userList: userData[];
}

export default function ListView({userList}: ListViewProps) {
  const srcList = [
    '/assets/favicon/facebook.jpg',
    '/assets/favicon/github.jpg',
    '/assets/favicon/instagram.jpg',
    '/assets/favicon/linkedin.jpg',
    '/assets/favicon/instagram.jpg',
    '/assets/favicon/dribble.jpg',
    '/assets/favicon/medium.jpg',
  ];
  const router = useRouter();
  const onClickCard = function (userId: number) {
    router.push(`users/${userId}`);
  };
  return (
    <>
      {userList.map((data, index) => (
        <div
          key={`profile-card-${index}`}
          className={styles['card-wrapper']}
          onClick={() => {
            onClickCard(data.id);
          }}
        >
          <Card key={data.id}>
            <div className={styles['glimpse-compact-wrapper']}>
              <div className={styles['left-wrapper']}>
                <div className={styles['profile-wrapper']}>
                  <Avatar
                    src={
                      data.profileImageUrl ??
                      '/assets/glimpse-list/temp-glimpse-list-img.jpg'
                    }
                    alt="프로필이미지"
                    height={50}
                    width={50}
                  />
                  <div className={styles['profile-info-wrapper']}>
                    <p className={styles['profile-name']}>{data.displayName}</p>
                    <div className={styles['position-wrapper']}>
                      <Chip
                        key={index}
                        label={data.department}
                        height={28}
                        backgroundColor={'#C1AEF6'}
                        borderRadius={4}
                      />
                    </div>
                  </div>
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
              <div className={styles['right-wrapper']}>
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
            </div>
          </Card>
        </div>
      ))}
    </>
  );
}
