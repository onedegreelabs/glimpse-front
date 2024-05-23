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

  return (
    <div className={styles['backdrop']}>
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
          <div className={styles['top']}>
            <div className={styles['user-name']}>
              Name
              <div className={styles['bold']}>{userInfo?.user.name}</div>
            </div>
            <Image
              src={'/icons/profile_image.svg'}
              alt="profile"
              width={120}
              height={120}
              onClick={() => router.push(`/profile/${userId}`)}
            />
          </div>
          <div className={styles['middle']}>
            <div className={styles['row']}>
              <label>Organization</label>
              <div>{userInfo?.user.belong}</div>
            </div>
            <div className={styles['row']}>
              <label>Organization</label>
              <div>{userInfo?.user.belong}</div>
            </div>
            <div className={styles['row']}>
              <label>Organization</label>
              <div>{userInfo?.user.belong}</div>
            </div>
            <div className={styles['row']}>
              <label>Organization</label>
              <div>{userInfo?.user.belong}</div>
            </div>
            <div className={styles['row']}>
              <label>Organization</label>
              <div>{userInfo?.user.belong}</div>
            </div>
          </div>
          <div className={styles['middle']}></div>
        </div>
      </div>
    </div>
  );
}
