import {useEffect, useState} from 'react';

import Image from 'next/image';
import styles from './CustomQuestionModal.module.scss';

interface CustomQuestionModalProps {
  onClose: () => void;
}

export default function CustomQuestionModal({
  onClose,
}: CustomQuestionModalProps) {
  const [mode, setmode] = useState('');
  const [toggle, setToggle] = useState(false);
  const [optionInputLength, setOptionInputLength] = useState(2);

  // mode 바뀔 때마다 input 개수 초기화
  useEffect(() => {
    setOptionInputLength(2);
  }, [mode]);

  // input 추가 버튼
  function addOptionInput() {
    setOptionInputLength(prev => prev + 1);
  }

  return (
    <>
      <div className={styles['backdrop']} onClick={onClose} />
      <dialog className={styles['dialog']}>
        <div className={styles['add-question']}>
          {mode !== '' && (
            <Image
              src={'/assets/events/rsvp/back-button.svg'}
              alt="back"
              width={24}
              height={24}
              onClick={() => setmode('')}
            />
          )}
          {mode === '' && <div className={styles['spacer']}></div>}
          <div>Add Question</div>
          <Image
            src={'/assets/events/rsvp/modal-close.svg'}
            alt="close"
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        {mode === '' && (
          <>
            <div className={styles['title']}>
              <p>
                Add a question that gives you a better understanding of the
                guest.
              </p>
            </div>

            <button onClick={() => setmode('text')}>Text</button>
            <button onClick={() => setmode('single')}>Single Choice</button>
            <button onClick={() => setmode('multiple')}>Mutiple Choice</button>
          </>
        )}
        {mode === 'text' && (
          <>
            <div className={styles['title']}>
              <div>TEXT</div>
              <p>You can get a text reply from the guest.</p>
            </div>
            <div className={styles['body']}>
              Question
              <input type="text" placeholder="Input" />
              <div className={styles['necessary']}>
                <div
                  className={`${styles['toggle-button']} ${
                    toggle ? styles['active'] : ''
                  }`}
                  onClick={() => setToggle(prev => !prev)}
                >
                  <div
                    className={`${styles['toggle']} ${
                      toggle ? styles['active'] : ''
                    }`}
                  />
                </div>
                Necessary
              </div>
              <button>Add Question</button>
            </div>
          </>
        )}
        {mode === 'single' && (
          <>
            <div className={styles['title']}>
              <div>Single Choice</div>
              <p>Guests can choose one.</p>
            </div>
            <div className={styles['body']}>
              <div className={styles['question']}>
                Question
                <input type="text" placeholder="Input" />
              </div>
              <div className={styles['option']}>
                Option
                {Array.from({length: optionInputLength}, (_, index) => (
                  <input key={index} type="text" placeholder="Input" />
                ))}
                <Image
                  src={'/assets/events/rsvp/add-circle.svg'}
                  alt="add"
                  width={13}
                  height={13}
                  onClick={addOptionInput}
                />
              </div>
              <div className={styles['necessary']}>
                <div
                  className={`${styles['toggle-button']} ${
                    toggle ? styles['active'] : ''
                  }`}
                  onClick={() => setToggle(prev => !prev)}
                >
                  <div
                    className={`${styles['toggle']} ${
                      toggle ? styles['active'] : ''
                    }`}
                  />
                </div>
                Necessary
              </div>
              <button>Add Question</button>
            </div>
          </>
        )}
        {mode === 'multiple' && (
          <>
            <div className={styles['title']}>
              <div>Single Choice</div>
              <p>Guests can choose from multiple options.</p>
            </div>
            <div className={styles['body']}>
              <div className={styles['question']}>
                Question
                <input type="text" placeholder="Input" />
              </div>
              <div className={styles['option']}>
                Option
                {Array.from({length: optionInputLength}, (_, index) => (
                  <input key={index} type="text" placeholder="Input" />
                ))}
                <Image
                  src={'/assets/events/rsvp/add-circle.svg'}
                  alt="add"
                  width={13}
                  height={13}
                  onClick={addOptionInput}
                />
              </div>
              <div className={styles['necessary']}>
                <div className={styles['toggle-button']}>
                  <div className={styles['toggle']} />
                </div>
                Necessary
              </div>
              <button>Add Question</button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
