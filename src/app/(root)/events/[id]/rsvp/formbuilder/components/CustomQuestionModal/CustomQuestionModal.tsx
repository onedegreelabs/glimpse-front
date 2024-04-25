import {useEffect, useState, Dispatch, SetStateAction} from 'react';

import Image from 'next/image';
import styles from './CustomQuestionModal.module.scss';

interface CustomQuestionModalProps {
  onClose: () => void;
  setCustomQuestions: Dispatch<
    SetStateAction<
      {type: string; question: string; options: string[]; necessary: boolean}[]
    >
  >;
}

export default function CustomQuestionModal({
  onClose,
  setCustomQuestions,
}: CustomQuestionModalProps) {
  const [question, setQuestion] = useState({
    type: 'default',
    question: '',
    options: ['', ''],
    necessary: false,
  });

  // type이 바뀔 때마다 input 개수, necessary 초기화
  useEffect(() => {
    const updatedQuestion = {...question, necessary: false, options: ['', '']};
    setQuestion(updatedQuestion);
  }, [question.type]);

  // 현재 type 설정
  function setType(curType: string) {
    const updatedQuestion = {...question, type: curType};
    setQuestion(updatedQuestion);
  }

  // 현재 question 설정
  function changeQuestion(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedQuestion = {...question, question: event.target.value};
    setQuestion(updatedQuestion);
  }

  // 작성한 현재 option 값 설정
  const changeInput = (index: number, value: string) => {
    const newInputs = [...question.options];
    newInputs[index] = value;
    const updatedQuestion = {...question, options: newInputs};
    setQuestion(updatedQuestion);
  };

  // input 추가 버튼
  function addOptionInput() {
    const updatedQuestion = {...question, options: [...question.options, '']};
    setQuestion(updatedQuestion);
  }

  // 현재 necessary 설정
  function setNecessary() {
    const updatedQuestion = {...question, necessary: !question.necessary};
    setQuestion(updatedQuestion);
  }

  // 작성한 CustomQuestion 제출
  function addQuestion() {
    switch (question.type) {
      case 'text':
        if (question.question === '') {
          alert('question을 입력하세요.');
        } else {
          setCustomQuestions(prev => [...prev, question]);
          onClose();
        }
        break;
      case 'single':
        if (question.question === '') {
          alert('question을 입력하세요.');
        } else {
          setCustomQuestions(prev => [...prev, question]);
          onClose();
        }
        break;
      case 'multiple':
        if (question.question === '') {
          alert('question을 입력하세요.');
        } else {
          setCustomQuestions(prev => [...prev, question]);
          onClose();
        }
        break;
    }
  }

  return (
    <>
      <div className={styles['backdrop']} onClick={onClose} />
      <dialog className={styles['dialog']}>
        <div className={styles['add-question']}>
          {question.type !== 'default' && (
            <Image
              src={'/assets/events/rsvp/back-button.svg'}
              alt="back"
              width={24}
              height={24}
              onClick={() => setType('default')}
            />
          )}
          {question.type === 'default' && (
            <div className={styles['spacer']}></div>
          )}
          <div>Add Question</div>
          <Image
            src={'/assets/events/rsvp/modal-close.svg'}
            alt="close"
            width={24}
            height={24}
            onClick={onClose}
          />
        </div>
        {question.type === 'default' && (
          <>
            <div className={styles['title']}>
              <p>
                Add a question that gives you a better understanding of the
                guest.
              </p>
            </div>

            <button onClick={() => setType('text')}>Text</button>
            <button onClick={() => setType('single')}>Single Choice</button>
            <button onClick={() => setType('multiple')}>Mutiple Choice</button>
          </>
        )}
        {question.type === 'text' && (
          <>
            <div className={styles['title']}>
              <div>TEXT</div>
              <p>You can get a text reply from the guest.</p>
            </div>
            <div className={styles['body']}>
              Question
              <input
                type="text"
                placeholder="Input"
                onChange={event => changeQuestion(event)}
              />
              <div className={styles['necessary']}>
                <div
                  className={`${styles['toggle-button']} ${
                    question.necessary ? styles['active'] : ''
                  }`}
                  onClick={setNecessary}
                >
                  <div
                    className={`${styles['toggle']} ${
                      question.necessary ? styles['active'] : ''
                    }`}
                  />
                </div>
                Necessary
              </div>
              <button onClick={addQuestion}>Add Question</button>
            </div>
          </>
        )}
        {question.type === 'single' && (
          <>
            <div className={styles['title']}>
              <div>Single Choice</div>
              <p>Guests can choose one.</p>
            </div>
            <div className={styles['body']}>
              <div className={styles['question']}>
                Question
                <input
                  type="text"
                  placeholder="Input"
                  onChange={event => changeQuestion(event)}
                />
              </div>
              <div className={styles['option']}>
                Option
                <div className={styles['option-scroll']}>
                  <div>
                    {question.options.map((input, index) => (
                      <input
                        key={index}
                        type="text"
                        value={input}
                        placeholder="Input"
                        onChange={event =>
                          changeInput(index, event.target.value)
                        }
                      />
                    ))}
                    {question.options.length < 5 && (
                      <Image
                        src={'/assets/events/rsvp/add-circle.svg'}
                        alt="add"
                        width={13}
                        height={13}
                        onClick={addOptionInput}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles['necessary']}>
                <div
                  className={`${styles['toggle-button']} ${
                    question.necessary ? styles['active'] : ''
                  }`}
                  onClick={setNecessary}
                >
                  <div
                    className={`${styles['toggle']} ${
                      question.necessary ? styles['active'] : ''
                    }`}
                  />
                </div>
                Necessary
              </div>
              <button onClick={addQuestion}>Add Question</button>
            </div>
          </>
        )}
        {question.type === 'multiple' && (
          <>
            <div className={styles['title']}>
              <div>Single Choice</div>
              <p>Guests can choose from multiple options.</p>
            </div>
            <div className={styles['body']}>
              <div className={styles['question']}>
                Question
                <input
                  type="text"
                  placeholder="Input"
                  onChange={event => changeQuestion(event)}
                />
              </div>
              <div className={styles['option']}>
                Option
                <div className={styles['option-scroll']}>
                  <div>
                    {question.options.map((input, index) => (
                      <input
                        key={index}
                        type="text"
                        value={input}
                        placeholder="Input"
                        onChange={event =>
                          changeInput(index, event.target.value)
                        }
                      />
                    ))}
                    {question.options.length < 5 && (
                      <Image
                        src={'/assets/events/rsvp/add-circle.svg'}
                        alt="add"
                        width={13}
                        height={13}
                        onClick={addOptionInput}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className={styles['necessary']}>
                <div
                  className={`${styles['toggle-button']} ${
                    question.necessary ? styles['active'] : ''
                  }`}
                  onClick={setNecessary}
                >
                  <div
                    className={`${styles['toggle']} ${
                      question.necessary ? styles['active'] : ''
                    }`}
                  />
                </div>
                Necessary
              </div>
              <button onClick={addQuestion}>Add Question</button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
