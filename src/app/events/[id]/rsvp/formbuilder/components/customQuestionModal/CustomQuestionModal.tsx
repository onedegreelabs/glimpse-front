import {useEffect, useState, Dispatch, SetStateAction, useRef} from 'react';

import {saveQuestion} from '@/hooks/swr/useEvents';
import Image from 'next/image';
import styles from './CustomQuestionModal.module.scss';

interface CustomQuestionModalProps {
  eventId:number;
  onClose: () => void;
  setCustomQuestions: Dispatch<
    SetStateAction<
      {
        id: number;
        surveyId: number;
        type: string;
        question: string;
        isRequired: boolean;
        maxCount: number;
        options: {text: string}[];
      }[]
    >
  >;
}

export default function CustomQuestionModal({
  eventId,
  onClose,
  setCustomQuestions,
}: CustomQuestionModalProps) {
  const lastInput = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState({
    id: 0,
    surveyId: 0,
    type: 'default',
    question: '',
    isRequired: false,
    maxCount: 0,
    options: [{text: ''}],
  });

  // type이 바뀔 때마다 input 개수, isRequired 초기화
  useEffect(() => {
    const updatedQuestion = {
      ...question,
      isRequired: false,
      options: [{text: ''}],
    };
    setQuestion(updatedQuestion);
  }, [question.type]);

  // 현재 type, maxCount 설정
  function setType(curType: string, maxCount: number) {
    const updatedQuestion = {...question, type: curType, maxCount};
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
    newInputs[index].text = value;
    const updatedQuestion = {...question, options: newInputs};
    setQuestion(updatedQuestion);
  };

  // input 추가 버튼
  function addOptionInput() {
    const updatedQuestion = {
      ...question,
      options: [...question.options, {text: ''}],
    };
    setQuestion(updatedQuestion);

    setTimeout(() => {
      scrollHandler();
    }, 0);
  }

  // 현재 isRequired 설정
  function setIsRequired() {
    const updatedQuestion = {...question, isRequired: !question.isRequired};
    setQuestion(updatedQuestion);
  }

  // 작성한 CustomQuestion 제출
  async function addQuestion() {

    const customQuestion = {
      type: question.type,
      question: question.question,
      isRequired: question.isRequired,
      maxCount: question.maxCount,
      options: question.options.map(option => option.text),
    };

    await saveQuestion(eventId, customQuestion);  

    setTimeout(()=>{
      setCustomQuestions(prev => [...prev, question]);
    },1000)

    window.location.reload();
  }

  function scrollHandler() {
    if (lastInput.current) {
      lastInput.current.scrollIntoView({behavior: 'smooth'});
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
              onClick={() => setType('default', 0)}
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

            <button onClick={() => setType('Text', 0)}>Text</button>
            <button onClick={() => setType('Choice', 1)}>Single Choice</button>
            <button onClick={() => setType('Choice', 5)}>Mutiple Choice</button>
          </>
        )}
        {question.type === 'Text' && (
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
                    question.isRequired ? styles['active'] : ''
                  }`}
                  onClick={setIsRequired}
                >
                  <div
                    className={`${styles['toggle']} ${
                      question.isRequired ? styles['active'] : ''
                    }`}
                  />
                </div>
                Necessary
              </div>
              <button onClick={addQuestion}>Add Question</button>
            </div>
          </>
        )}
        {question.type === 'Choice' && question.maxCount === 1 && (
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
                    {question.options.map((option, index) => {
                      // last input에 참조 추가
                      if (index !== question.options.length - 1) {
                        return (
                          <input
                            key={index}
                            type="text"
                            value={option.text}
                            placeholder="Input"
                            onChange={event =>
                              changeInput(index, event.target.value)
                            }
                          />
                        );
                      } else {
                        return (
                          <input
                            ref={lastInput}
                            key={index}
                            type="text"
                            value={option.text}
                            placeholder="Input"
                            onChange={event =>
                              changeInput(index, event.target.value)
                            }
                          />
                        );
                      }
                    })}
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
                    question.isRequired ? styles['active'] : ''
                  }`}
                  onClick={setIsRequired}
                >
                  <div
                    className={`${styles['toggle']} ${
                      question.isRequired ? styles['active'] : ''
                    }`}
                  />
                </div>
                Necessary
              </div>
              <button onClick={addQuestion}>Add Question</button>
            </div>
          </>
        )}
        {question.type === 'Choice' && question.maxCount === 5 && (
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
                    {question.options.map((option, index) => {
                      // last input에 참조 추가
                      if (index !== question.options.length - 1) {
                        return (
                          <input
                            key={index}
                            type="text"
                            value={option.text}
                            placeholder="Input"
                            onChange={event =>
                              changeInput(index, event.target.value)
                            }
                          />
                        );
                      } else {
                        return (
                          <input
                            ref={lastInput}
                            key={index}
                            type="text"
                            value={option.text}
                            placeholder="Input"
                            onChange={event =>
                              changeInput(index, event.target.value)
                            }
                          />
                        );
                      }
                    })}
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
                    question.isRequired ? styles['active'] : ''
                  }`}
                  onClick={setIsRequired}
                >
                  <div
                    className={`${styles['toggle']} ${
                      question.isRequired ? styles['active'] : ''
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
