import Image from 'next/image';
import styles from './page.module.scss';
import {useState} from 'react';

export default function FloatingButton() {
  const [isShowOptions, setIsShowOptions] = useState(false);

  const onClick = () => {
    setIsShowOptions(!isShowOptions);
  };

  const addTextClick = () => {
    console.log('add text');
  };

  const addLinkClick = () => {
    console.log('add link');
  };

  const addHashTagClick = () => {
    console.log('add hashtag');
  };

  return (
    <div className={styles['floating-button-container']}>
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
                <div className={styles['option-button']} onClick={addLinkClick}>
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
                  onClick={addHashTagClick}
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
    </div>
  );
}
