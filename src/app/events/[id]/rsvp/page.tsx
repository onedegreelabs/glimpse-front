'use client';
import {usePathname} from 'next/navigation';
import {useState, FormEvent, useEffect, ChangeEvent} from 'react';
import styles from './EventRsvpContainer.module.scss';
import {
  applyEvent,
  useEventDetail,
  useEventQuestion,
} from '@/hooks/swr/useEvents';
import {useMyProfile} from '@/hooks/swr/useProfiles';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {values} from 'lodash';

interface QuestionType {
  id: number;
  question: string;
  type: string;
  isRequired: true;
  maxCount: number;
  sequence: number;
  options: {
    id: number;
    text: string;
  }[];
}

interface InputValid {
  givenName: string;
  familyName: string;
  role: string;
  belong: string;
  experience: string;
  region: string;
  purpose: string;
}

interface TextAnwerType {
  id: number;
  value: string;
}

export default function EventRsvpContainer() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const eventHandle = pathnameList?.[pathnameList.length - 2];
  const {data: detailData} = useEventDetail(eventHandle);
  const [eventId, setEventId] = useState(0);
  const {data: questionsData} = useEventQuestion(eventId);
  const {data: profileData} = useMyProfile();
  const [interests, setInterests] = useState([]);
  const [purpose, setPurpose] = useState('');
  const [textAnswers, setTextAnswers] = useState<TextAnwerType[]>([]);
  const [inputValid, setInputValid] = useState<InputValid>({
    givenName: '',
    familyName: '',
    role: '',
    belong: '',
    experience: '',
    region: '',
    purpose: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (detailData?.data?.id) {
      setEventId(detailData.data.id);
    }
  }, [detailData]);
  // 프로필 페이지로 이동
  function toProfile() {
    router.push('/my/profile');
  }
  // Text custom question change Event
  function changeTextAnswer(
    event: ChangeEvent<HTMLInputElement>,
    curId: number
  ) {
    setTextAnswers(prev => {
      const curTextAnswer = prev.find(textAnswer => textAnswer.id === curId);

      if (curTextAnswer) {
        return prev.map(textAnswer =>
          textAnswer.id === curId
            ? {...textAnswer, value: event.target.value}
            : textAnswer
        );
      } else {
        return [...prev, {id: curId, value: event.target.value}];
      }
    });
  }
  // 참가 신청
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const fd = new FormData(formElement);
    const data: Record<string, FormDataEntryValue | string[]> = {};
    data.interest = [];

    for (const [key, value] of fd.entries()) {
      if (!value) {
        setInputValid(prevInputValid => ({
          ...prevInputValid,
          [key]: 'invalid',
        }));
      }

      if (value === 'on') {
        const interest = key.split('-');
        data.interest.push(interest[0]);
      } else {
        data[key] = value;
      }
    }

    // applyEvent(eventId, data);
  }

  return (
    <form className={styles['rsvp']} onSubmit={handleSubmit}>
      <div className={styles['rsvp-container']}>
        <div className={styles['rsvp-title']}>
          <h1>Winter 2023 Party in NYC</h1>
          <p>Please answer this survey.</p>
        </div>
        <div className={styles['rsvp-required']}>Required *</div>
        <div className={styles['profile-info-container']}>
          <h4>Profile Info</h4>
          <Image
            src={'/icons/info_icon.svg'}
            alt="info"
            width={14}
            height={14}
          />
          <div className={styles['edit']}>
            <p />
            <div className={styles['to-profile']} onClick={toProfile}>
              <h4>Edit</h4>
              <Image
                src={'/icons/arrow_icon.svg'}
                alt="info"
                width={6.11}
                height={10.56}
              />
            </div>
          </div>
        </div>
        {/* profile-info*/}
        <div className={styles['profile-info']}>
          <label>
            Name (이름) <span> *</span>
          </label>
          <div>{profileData?.data?.name}</div>
        </div>
        <div className={styles['profile-info']}>
          <label>
            Email (registered with Glimpse)<span> *</span>
          </label>
          <div>{profileData?.data?.email}</div>
        </div>
        <div className={styles['profile-info']}>
          <label>Location</label>
          <div>{profileData?.data?.region}</div>
        </div>
        <div className={styles['profile-info']}>
          <label>Specialization</label>
          <div>{profileData?.data?.role}</div>
        </div>
        <div className={styles['profile-info']}>
          <label>Company</label>
          <div>{profileData?.data?.belong}</div>
        </div>
        {/* registration-question*/}
        <div className={styles['registration-question-label']}>
          <h4>Registration Questions</h4>
        </div>
        <div className={styles['registration-question-container']}>
          <div className={styles['registration-question']}>
            <label>
              Purpose of Participation <span> *</span>
            </label>
            <textarea
              placeholder="Place holder"
              name="purpose"
              value={purpose}
              onChange={e => {
                if (e.target.value.length < 300) {
                  setPurpose(e.target.value);
                }
              }}
            />
            <div
              className={styles['text-length']}
            >{`${purpose.length}/300`}</div>
          </div>
          <div className={styles['registration-question']}>
            <label>{'Interest (Tag)'}</label>
            <input placeholder="Place holder" name="interest" />
            <div className={styles['text-length']}>0/10</div>
          </div>
          {questionsData?.data?.customQuestions.questions.map(
            (question: QuestionType) => (
              <div
                key={question.id}
                className={styles['registration-question']}
              >
                <label>{question.question}</label>
                {question.type === 'Text' && (
                  <>
                    <input
                      placeholder="Place holder"
                      name={question.id.toString()}
                      value={
                        textAnswers.find(
                          textAnswer => textAnswer.id === question.id
                        )?.value
                      }
                      onChange={e => {
                        if (e.target.value.length < 21)
                          changeTextAnswer(e, question.id);
                      }}
                    />
                    <div className={styles['text-length']}>
                      {`${
                        textAnswers.find(
                          textAnswer => textAnswer.id === question.id
                        )?.value.length ?? 0
                      }/20`}
                    </div>
                  </>
                )}
                {question.type === 'Choice' &&
                  (question.maxCount === 1 ? (
                    <>
                      <div className={styles['checkbox']}>
                        {question.options.map(option => (
                          <div key={option.id} className={styles['row']}>
                            <input
                              className={styles['single']}
                              name="single"
                              type="radio"
                              id={option.id + ''}
                            />
                            <label htmlFor={option.id + ''}></label>
                            {option.text}
                          </div>
                        ))}
                      </div>
                      <div className={styles['guide-phrase']}>
                        You can only choose one.
                      </div>
                    </>
                  ) : (
                    //  question.maxCount가 1이 아닐 때
                    <>
                      <div className={styles['checkbox']}>
                        {question.options.map(option => (
                          <div key={option.id} className={styles['row']}>
                            <input
                              className={styles['multiple']}
                              type="checkbox"
                              id={option.id + ''}
                            />
                            <label htmlFor={option.id + ''}></label>
                            {option.text}
                          </div>
                        ))}
                      </div>
                      <div className={styles['guide-phrase']}>
                        You can choose several.
                      </div>
                    </>
                  ))}
              </div>
            )
          )}
        </div>
        <button>Submit</button>
      </div>
    </form>
  );
}
