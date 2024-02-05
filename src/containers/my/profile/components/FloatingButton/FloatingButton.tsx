import Image from 'next/image';
import {useState} from 'react';
import styles from './floatingButton.module.scss';

interface FloatingButtonProps {
  onClickShowAddInput: (taget: 'LINK' | 'HASHTAG') => void;
}

export default function FloatingButton({
  onClickShowAddInput,
}: FloatingButtonProps) {
  const [isShowOptions, setIsShowOptions] = useState(false);

  const onClick = () => {
    setIsShowOptions(!isShowOptions);
  };

  const addTextClick = () => {
    console.log('add text');
  };

  return (
    <div className={styles['button']}>
      {!isShowOptions ? (
        <div className={styles['icon-button']} onClick={onClick}>
          <Image
            src="/assets/profile/plus.svg"
            alt="닫기버튼"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <div className={styles['icon-button']} onClick={onClick}>
          <Image
            src="/assets/profile/cross.svg"
            alt="추가버튼"
            width={40}
            height={40}
          />
          <ul className={styles['options']}>
            <li>
              <div className={styles['option-button']} onClick={addTextClick}>
                <Image
                  src="/assets/profile/edit-alt.svg"
                  alt="텍스트카드추가"
                  width={24}
                  height={24}
                />
              </div>
            </li>
            <li>
              <div
                className={styles['option-button']}
                onClick={() => onClickShowAddInput('LINK')}
              >
                <Image
                  src="/assets/profile/attach.svg"
                  alt="링크추가"
                  width={24}
                  height={24}
                />
              </div>
            </li>
            <li>
              <div
                className={styles['option-button']}
                onClick={() => onClickShowAddInput('HASHTAG')}
              >
                <Image
                  src="/assets/profile/hashtag-solid.svg"
                  alt="해시태그추가"
                  width={24}
                  height={24}
                />
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
