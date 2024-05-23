import {eventUserDataType} from '@/types/eventTypes';
import styles from './Cartmodal.module.scss';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

interface CardModalProps {
  userId: number;
  eventUserData: eventUserDataType[];
  onCloseModal: () => void;
}

export default function CardModal({
  userId,
  eventUserData,
  onCloseModal,
}: CardModalProps) {
  const [userInfo, setUserInfo] = useState<eventUserDataType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const curUser = eventUserData.find(user => user.user.id === userId) || null;

    setUserInfo(curUser);
  }, [userId, eventUserData]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 모달 영역 외부를 클릭하면 모달을 닫습니다.
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

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
              <div className={styles['bold']}>{userInfo?.user.name}</div>
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
              <div>{userInfo?.user.belong}</div>
            </div>
            <div className={styles['row']}>
              <label>Role</label>
              <div>{userInfo?.role}</div>
            </div>
            <div className={styles['row']}>
              <label>Purpose</label>
              <div>{userInfo?.purpose}</div>
            </div>
            <div className={styles['row']}>
              <label>Company Website</label>
              <div>{userInfo?.user.sns[0].account}</div>
            </div>
            <div className={styles['row']}>
              <label>Purpose</label>
              <div>{userInfo?.purpose}</div>
            </div>
            <div className={styles['row']}>
              <label>Company Website</label>
              <div>{userInfo?.user.sns[0].account}</div>
            </div>
          </div>
          <div className={styles['']}>데이터 업데이트 되면 작업 예정..</div>
        </div>
      </div>
    </div>
  );
}
