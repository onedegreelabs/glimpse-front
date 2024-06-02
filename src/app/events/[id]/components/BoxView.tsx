import Avatar from '@/app/events/[id]/components/Avatar';
import Chip from '@/components/chip/Chip';
import styles from './boxView.module.scss';
import Card from '@/components/card/Card';
import IconText from '@/components/iconText/IconText';
import Image from 'next/image';
// import {useRouter} from 'next/navigation';
import {eventUserDataType} from '@/types/eventTypes';
import EmptyUser from './EpmtyUser';
import {useEffect, useState} from 'react';
import {eventUserDataType2} from '@/types/rocketTypes';

export default function BoxView({
  userList,
  setModal,
}: {
  userList: eventUserDataType2[];
  setModal: React.Dispatch<
    React.SetStateAction<{type: string; id: number; isOpen: boolean}>
  >;
}) {
  // const router = useRouter();

  const onClickCard = function (userId: number) {
    // router.push(`/profile/${userId}`);
    setModal({type: 'profile', id: userId, isOpen: true});
  };

  const clickMail = (userId: number) => {
    setModal({
      type: 'mail',
      id: userId,
      isOpen: true,
    });
  };

  const onClickSnsIcon = (url: string) => {
    const newUrl = url.startsWith('http') ? url : `http://${url}`;
    window.open(newUrl, '_blank');
  };

  const SNS_IMAGE_SRC = [
    {
      type: 'github',
      src: '/assets/sns-link/github.svg',
    },
    {
      type: 'medium',
      src: '/assets/sns-link/medium.svg',
    },
    {
      type: 'figma',
      src: '/assets/sns-link/figma.svg',
    },
    {
      type: 'linkedin',
      src: '/assets/sns-link/linkedin.svg',
    },
    {
      type: 'dribble',
      src: '/assets/sns-link/dribble.svg',
    },
    {
      type: 'instagram',
      src: '/assets/sns-link/instagram.svg',
    },
    {
      type: 'facebook',
      src: '/assets/sns-link/facebook.svg',
    },
    {
      type: 'web_etc',
      src: '/assets/sns-link/web_etc.svg',
    },
  ];

  const getImageSrcFromSnsLink = (snsLink: string) => {
    // const matchedItem = SNS_IMAGE_SRC.find(item => {
    //   return snsLink === item.type;
    // });
    // const imgSrc: string = matchedItem
    //   ? matchedItem.src
    //   : '/assets/sns-link/web_etc.svg';

    const matchedItem = SNS_IMAGE_SRC.find(sns => snsLink.includes(sns.type));

    const imgSrc = matchedItem
      ? matchedItem.src
      : '/assets/sns-link/web_etc.svg';

    return imgSrc;
  };

  // Eric요청으로 북마크 기능동작 필요없이 클릭 시 북마크 이미지 변경 기능만 되는 로직
  const [tmpBookmarkList, setTmpBookmarkList] = useState<boolean[]>([]);

  useEffect(() => {
    if (userList.length > 0) {
      const tmpList = new Array(userList.length).fill(false);
      setTmpBookmarkList(tmpList);
    }
  }, [userList]);

  const clickBookmark = (idx: number) => {
    const copyList = [...tmpBookmarkList];
    copyList[idx] = !copyList[idx];
    setTmpBookmarkList(copyList);
  };

  if (userList.length > 0) {
    return (
      <>
        {userList.map((data, index) => (
          <div key={`profile-card-${index}`} className={styles['card-wrapper']}>
            <Card key={data.id} height={250} width={340}>
              <div
                className={styles['glimpse-list-wrapper']}
                onClick={() => {
                  // onClickCard(data.user.id);
                  onClickCard(data.id);
                }}
              >
                <div className={styles['card-header']}>
                  {/* <div className={styles['icon-wrapper']}>
                    {tmpBookmarkList[index] ? (
                      <Image
                        alt="bookmark-icon"
                        src={'/icons/bookmark_filled.svg'}
                        width={24}
                        height={24}
                        onClick={e => {
                          e.stopPropagation();
                          clickBookmark(index);
                        }}
                      />
                    ) : (
                      <Image
                        alt="bookmark-icon"
                        src={'/icons/bookmark-icon.svg'}
                        width={24}
                        height={24}
                        onClick={e => {
                          e.stopPropagation();
                          clickBookmark(index);
                        }}
                      />
                    )}
                  </div> */}
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
                  <div className={styles['avatar-wrapper']}>
                    <Avatar
                      src={
                        // data?.user?.image
                        //   ? data.user.image // 유저 이미지
                        //   : '/icons/profile_image.svg' // 대체 이미지
                        data?.profileImage
                          ? data.profileImage // 유저 이미지
                          : '/icons/profile_image.svg' // 대체 이미지
                      }
                      alt="프로필이미지"
                      height={80}
                      width={80}
                    />
                    {
                      // data?.role === 'Organizer'
                      data?.roleType === 'Organizer' && (
                        <Image
                          className={styles['host-badge']}
                          src={'/icons/profile/hostBadge.svg'}
                          width={85}
                          height={85}
                          alt="host-badge"
                        />
                      )
                    }
                  </div>
                  <div>
                    <p className={styles['profile-name']}>
                      {/* {data?.user?.name} */}
                      {data?.name}
                    </p>
                    {/* <IconText
                      src={'/assets/glimpse-list/Location.svg'}
                      alt={'위치 아이콘'}
                      width={16}
                      height={16}
                      // text={'San Fancisco, USA'}
                      text={data?.location ? data?.location : '-'}
                      fontsize={12}
                      gap={4}
                    /> */}
                    <div className={styles['position-wrapper']}>
                      {/* <Chip
                        key={index}
                        label={data.belong}
                        height={28}
                        backgroundColor={'#C1AEF6'}
                        borderRadius={4}
                        fontSize={12}
                        fontWeight={600}
                      /> */}
                      {data.belong}
                    </div>
                  </div>
                </div>
                <div className={styles['intro-snippet']}>
                  <p>{data.bio}</p>
                </div>
                {/* <div className={styles['hobby-wrapper']}>
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
                </div> */}
              </div>
              <div className={styles['link-wrapper']}>
                {
                  // data.user.sns.map((snsItem, index: number) => (
                  data.socialLinks.map((snsItem, index: number) => (
                    <Image
                      key={`link_${index}`}
                      // src={getImageSrcFromSnsLink(snsItem.type)}
                      src={getImageSrcFromSnsLink(snsItem.url)}
                      alt={'img'}
                      width={32}
                      height={32}
                      onClick={e => {
                        e.stopPropagation();
                        onClickSnsIcon(snsItem.url);
                      }}
                    />
                  ))
                }
                <Image
                  src={'/icons/mail-icon.svg'}
                  alt={'img'}
                  width={32}
                  height={32}
                  onClick={() => clickMail(data.id)}
                />
                {/* <Image
                  src={'/icons/calendar.svg'}
                  alt={'img'}
                  width={32}
                  height={32}
                /> */}
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
