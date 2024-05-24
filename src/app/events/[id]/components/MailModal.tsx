import {eventUserDataType, EventDataType} from '@/types/eventTypes';
import styles from './MailModal.module.scss';
import {useEffect, useState} from 'react';
import Image from 'next/image';

interface MailModalProps {
  userId: number;
  eventDetailData: EventDataType;
  eventUserData: eventUserDataType[];
  onCloseModal: () => void;
}

export default function MailModal({
  userId,
  eventDetailData,
  eventUserData,
  onCloseModal,
}: MailModalProps) {
  const [userInfo, setUserInfo] = useState<eventUserDataType | null>(null);

  const dateString = new Date(eventDetailData.startAt).toLocaleDateString(
    'ko-KR',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
  );

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
      <div className={styles['mail-modal']}>
        <div className={styles['btn-wrapper']}>
          <Image
            className={styles['close-btn']}
            src={'/assets/events/rsvp/modal-close.svg'}
            alt="profile"
            width={40}
            height={40}
            onClick={onCloseModal}
          />
        </div>
        <div className={styles['body']}>
          <div className={styles['title']}>
            <h1>이메일 연락하기</h1>
            <p>
              {`미리 작성된 이메일 제목과 본문 템플릿의 “이름"과 "직접 입력" 항목만 수정
    후 이메일 보내기를 누르시면 이메일 발송을 할 수 있어요.`}
            </p>
          </div>
          <div className={styles['content']}>
            <p>
              title :<br />
              {dateString} {eventDetailData.title}에서 뵈었던 {'{ 이름 입력 }'}{' '}
              입니다.🙌
            </p>
            <p>
              <br />
              body:
              <br />
              {`안녕하세요, ${eventDetailData.title} 에서 참가했던 '{ 직접 입력 }'
    에 관해 논의해보고 싶어 이메일 드립니다. 이메일 편을 통해서 더
    추가적으로 이야기나눠볼 수 있으면 좋겠습니다.`}
            </p>
          </div>
          <button
            onClick={() => {
              const subject = encodeURIComponent(
                `${dateString} ${eventDetailData.title}에서 뵈었던 { 이름 입력 } 입니다.🙌`
              );
              const body = encodeURIComponent(
                `안녕하세요, ${eventDetailData.title}에서 참가했던 { 직접 입력 }에 관해 논의해보고 싶어 이메일 드립니다.`
              );
              window.location.href = `mailto:saasduckwho@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            이메일 작성 후 전송하기
          </button>
        </div>
      </div>
    </div>
  );
}
