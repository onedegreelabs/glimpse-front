import Avatar from '@/app/events/[id]/components/Avatar';
import Chip from '@/components/chip/Chip';
import styles from './boxView.module.scss';
import Card from '@/components/card/Card';
import IconText from '@/components/iconText/IconText';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {eventUserDataType} from '@/types/eventTypes';
import EmptyUser from './EpmtyUser';

export default function BoxView({userList}: {userList: eventUserDataType[]}) {
  const router = useRouter();

  const onClickCard = function (userId: number) {
    router.push(`/profile/${userId}`);
  };

  const onClickSnsIcon = (url: string) => {
    window.open(url, '_blank');
  };

  const SNS_IMAGE_SRC = [
    {
      type: 'Github',
      src: '/assets/sns-link/github.jpg',
    },
    {
      type: 'Medium',
      src: '/assets/sns-link/medium.jpg',
    },
    // {
    //   type: 'Figma',
    //   src: '/assets/sns-link/figma.jpg',
    // },
    {
      type: 'Linkedin',
      src: '/assets/sns-link/linkedin.jpg',
    },
    {
      type: 'Dribble',
      src: '/assets/sns-link/dribble.jpg',
    },
    {
      type: 'Instagram',
      src: '/assets/sns-link/instagram.jpg',
    },
    {
      type: 'Facebook',
      src: '/assets/sns-link/facebook.jpg',
    },
    {
      type: 'Web_etc',
      src: '/assets/sns-link/web_etc.svg',
    },
  ];

  const getImageSrcFromSnsLink = (snsLink: string) => {
    const matchedItem = SNS_IMAGE_SRC.find(item => {
      return snsLink === item.type;
    });
    const imgSrc: string = matchedItem
      ? matchedItem.src
      : '/assets/sns-link/web_etc.svg';

    return imgSrc;
  };

  if (userList.length > 0) {
    return (
      <>
        {userList.map((data, index) => (
          <div
            key={`profile-card-${index}`}
            className={styles['card-wrapper']}
            onClick={() => {
              onClickCard(data.user.id);
            }}
          >
            <Card key={data.id} height={340}>
              <div className={styles['glimpse-list-wrapper']}>
                <div className={styles['card-header']}>
                  <div className={styles['icon-wrapper']}>
                    <Image
                      alt="bookmark-icon"
                      src={'/icons/bookmark-icon.svg'}
                      width={24}
                      height={24}
                    />
                  </div>
                  {/* <div
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
                  </div> */}
                </div>
                <div className={styles['profile-wrapper']}>
                  <div>
                    <p className={styles['profile-name']}>{data?.user?.name}</p>
                    <IconText
                      src={'/assets/glimpse-list/Location.svg'}
                      alt={'위치 아이콘'}
                      width={16}
                      height={16}
                      text={'San Fancisco, USA'}
                      fontsize={12}
                      gap={4}
                    />
                    <div className={styles['position-wrapper']}>
                      <Chip
                        key={index}
                        label={data.user.belong}
                        height={28}
                        backgroundColor={'#C1AEF6'}
                        borderRadius={4}
                        fontSize={12}
                        fontWeight={600}
                      />
                    </div>
                  </div>
                  <div className={styles['avatar-wrapper']}>
                    <Avatar
                      src={
                        data?.user?.image
                          ? data.user.image // 유저 이미지
                          : '/icons/profile_image.svg' // 대체 이미지
                      }
                      alt="프로필이미지"
                      height={70}
                      width={70}
                    />
                    {data?.role === 'Organizer' && (
                      <Image
                        className={styles['host-badge']}
                        src={'/icons/crown.svg'}
                        width={16}
                        height={16}
                        alt="host-badge"
                      />
                    )}
                  </div>
                </div>
                <div className={styles['intro-snippet']}>
                  <p>{data.purpose}</p>
                </div>
                <div className={styles['hobby-wrapper']}>
                  {data.participantInterest.map(
                    (d: string | number, index: number) => (
                      <Chip
                        key={`hobby-${index}`}
                        label={`${d}`}
                        height={24}
                        backgroundColor="#F3F3F3"
                        borderRadius={30}
                        fontSize={12}
                        fontWeight={600}
                      />
                    )
                  )}
                </div>
                <div className={styles['link-wrapper']}>
                  {data.user.sns.map((snsItem, index: number) => (
                    <Image
                      key={`link_${index}`}
                      src={getImageSrcFromSnsLink(snsItem.type)}
                      alt={'img'}
                      width={32}
                      height={32}
                      onClick={e => {
                        e.stopPropagation();
                        onClickSnsIcon(snsItem.account);
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </>
    );
  } else {
    return <EmptyUser />;
  }
}
