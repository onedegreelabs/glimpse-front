import Avatar from './Avatar';
import Chip from '@/components/chip/Chip';
import styles from './gridView.module.scss';
import Card from '@/components/card/Card';
import {UserData} from './type';
import Image from 'next/image';
import clsx from 'clsx';
import {useRouter} from 'next/navigation';

// NOTE: list props로 변경하기

interface GridViewProps {
  userList: UserData[];
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

  const router = useRouter();
  const onClickCard = function (userId: number) {
    router.push(`users/${userId}`);
  };
  return (
    <div className={styles['grid-view-wrapper']}>
      {userList.map((data, index) => (
        <div
          key={`profile-card-${index}`}
          className={styles['card-wrapper']}
          onClick={() => {
            onClickCard(data.id);
          }}
        >
          <Card key={index}>
            <div className={styles['glimpse-grid-wrapper']}>
              <div className={styles['card-header']}>
                <div className={styles['icon-wrapper']}>
                  <Image
                    alt="bookmark-icon"
                    src={'/icons/bookmark-icon.svg'}
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
                    src={'/icons/comment.svg'}
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <div className={styles['profile-wrapper']}>
                <Avatar
                  src={
                    // data.profileImageUrl ??
                    '/assets/glimpse-list/temp-glimpse-list-img.jpg'
                  }
                  alt="프로필이미지"
                  height={40}
                  width={40}
                />
                <p
                  className={styles['profile-name']}
                >{`${data.user.givenName} ${data.user.familyName}`}</p>
              </div>
              <div className={styles['position-wrapper']}>
                <Chip
                  key={index}
                  label={data.role}
                  height={28}
                  backgroundColor={'#C1AEF6'}
                  borderRadius={4}
                />
              </div>
              <div className={styles['link-wrapper']}>
                {data.user.sns.map((snsData, index: number) => (
                  <Image
                    key={`link_${index}`}
                    src={'/icons/link_icon.svg'}
                    // src={srcList[Math.floor(Math.random() * 7)]}
                    alt={'img'}
                    width={32}
                    height={32}
                    onClick={() => {
                      window.open(snsData.account, '_blank');
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
