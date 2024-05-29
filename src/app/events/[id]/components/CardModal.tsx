import {eventUserDataType} from '@/types/eventTypes';
import styles from './Cartmodal.module.scss';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {eventUserDataType2} from '@/types/rocketTypes';

interface CardModalProps {
  userId: number;
  eventUserData: eventUserDataType2[];
  onCloseModal: () => void;
}

export default function CardModal({
  userId,
  eventUserData,
  onCloseModal,
}: CardModalProps) {
  const [userInfo, setUserInfo] = useState<eventUserDataType2 | null>(null);
  const router = useRouter();

  useEffect(() => {
    // const curUser = eventUserData.find(user => user.user.id === userId) || null;
    const curUser = eventUserData.find(user => user.id === userId) || null;

    setUserInfo(curUser);
  }, [userId, eventUserData]);

  // 모달 바깥 영역 클릭시 모달 종료
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  // ESC 눌렀을 때 모달 종료
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        onCloseModal();
      }
    };

    // 키보드 이벤트 리스너 등록
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles['backdrop']} onClick={handleBackdropClick}>
      <div className={styles['card-modal']}>
        <div className={styles['btn-wrapper']}>
          <Image
            className={styles['profile-btn']}
            src={'/icons/profile/usercard-icon.svg'}
            alt="profile"
            width={40}
            height={40}
            onClick={() => router.push(`/profile/${userId}`)}
          />
          <Image
            className={styles['close-btn']}
            src={'/assets/events/rsvp/modal-close.svg'}
            alt="profile"
            width={40}
            height={40}
            onClick={onCloseModal}
          />
        </div>
        <div className={styles['user-info']}>
          <div className={styles['header']}>
            <div className={styles['user-name']}>
              Name
              {/* <div className={styles['bold']}>{userInfo?.user.name}</div> */}
              <div className={styles['bold']}>{userInfo?.name}</div>
            </div>
            <div className={styles['profile-img']}>
              <Image
                src={'/icons/profile_image.svg'}
                alt="profile"
                width={120}
                height={120}
                layout="responsive"
                onClick={() => router.push(`/profile/${userId}`)}
              />
            </div>
          </div>
          <div className={styles['body']}>
            <div className={styles['row']}>
              <label>Organization</label>
              {/* <div>{userInfo?.user?.belong}</div> */}
              <div>{userInfo?.location ? userInfo?.location : '-'}</div>
            </div>
            <div className={styles['row']}>
              <label>Role</label>
              <div>{userInfo?.roleType}</div>
            </div>
            <div className={styles['row']}>
              <label>Purpose</label>
              {/* <div>{userInfo?.purpose}</div> */}
              <div>{userInfo?.bio}</div>
            </div>
            <div className={styles['row']}>
              <label>Email</label>
              {/* <div>{userInfo?.user?.sns[0]?.account}</div> */}
              <div>{userInfo?.email}</div>
            </div>
            <div className={styles['row']}>
              <label>Tags</label>
              {/* <div>{userInfo?.purpose}</div> */}
              <div>
                {userInfo?.tags.map(tag => {
                  return <p key={tag.id}>{tag.name}</p>;
                })}
              </div>
            </div>
            <div className={styles['row']}>
              <label>Specialization</label>
              {/* <div>{userInfo?.user?.sns[0]?.account}</div> */}
              <div>{userInfo?.specialization}</div>
            </div>
            <div className={styles['row']}>
              <label>Company Website</label>
              {/* <div>{userInfo?.user?.sns[0]?.account}</div> */}
              <div>{userInfo?.socialLinks[0]?.url}</div>
            </div>
            <div className={styles['row']}>
              <label>Position</label>
              {/* <div>{userInfo?.user?.sns[0]?.account}</div> */}
              <div>{userInfo?.position}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
