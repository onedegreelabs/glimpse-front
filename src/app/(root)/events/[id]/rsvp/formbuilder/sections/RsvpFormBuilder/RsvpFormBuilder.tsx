'use client';
import {useState, useEffect} from 'react';
import Image from 'next/image';

import styles from './RsvpFormBulder.module.scss';
import CustomQuestionModal from '../../components/CustomQuestionModal/CustomQuestionModal';
import Link from 'next/link';
import {QuestionType} from '@/types/eventTypes';
import {saveRequirement, useEventQuestion} from '@/hooks/swr/useEvents';
import {saveQuestion} from '@/hooks/swr/useEvents';

interface BuilderType {
  eventId: number;
}

const PRESETDATA = [
  {
    type: 'Text',
    question: 'Location',
    isRequired: false,
    maxCount: 0,
    options: [],
  },
  {
    type: 'Text',
    question: 'Specialization',
    isRequired: false,
    maxCount: 0,
    options: [],
  },
  {
    type: 'Text',
    question: 'Company',
    isRequired: false,
    maxCount: 0,
    options: [],
  },
  {
    type: 'Choice',
    question: 'Interest',
    isRequired: false,
    maxCount: 0,
    options: ['책읽기', '운동하기'],
  },
];

const REQUIREMENTSKEY = [
  'locationRequired',
  'specializationRequired',
  'companyRequired',
  'interestRequired',
];

export default function RsvpFormBuilder({eventId}: BuilderType) {
  const {data} = useEventQuestion(eventId);
  const [showModal, setShowModal] = useState(false);
  const [approvalReqired, setApprovalRequired] = useState(false);
  const [presetQuestions, setPresetQuestions] = useState(PRESETDATA);
  const [customQuestions, setCustomQuestions] = useState<QuestionType[]>([]);

  // 서버에 저장된 question 데이터 불러오기
  useEffect(() => {
    if (data?.data?.requirements) {
      setPresetQuestions(prev =>
        prev.map((question, index) => ({
          ...question,
          isRequired: data.data.requirements[REQUIREMENTSKEY[index]],
        }))
      );
    }
    if (data?.data?.customQuestions?.questions) {
      setCustomQuestions(data.data.customQuestions.questions);
    }
  }, [data]);

  useEffect(() => {
    const sendRequirement = async () => {
      const requirement = {
        locationRequired: presetQuestions[0].isRequired,
        specializationRequired: presetQuestions[1].isRequired,
        companyRequired: presetQuestions[2].isRequired,
        interestRequired: presetQuestions[3].isRequired,
      };

      await saveRequirement(eventId, requirement);
    };

    sendRequirement();
  }, [presetQuestions]);

  // CustomQuestionModal 닫기
  function closeModal() {
    setShowModal(false);
  }

  // question의 isRequired 변경
  async function changeIsRequired(id: string, itemIndex: number) {
    if (id === 'preset') {
      setPresetQuestions(prev => [
        ...prev.map((question, index) => {
          if (index === itemIndex) {
            return {...question, isRequired: !question.isRequired};
          }
          return question;
        }),
      ]);
    } else {
      setCustomQuestions(prev => [
        ...prev.map((question, index) => {
          if (index === itemIndex) {
            return {...question, isRequired: !question.isRequired};
          }
          return question;
        }),
      ]);

      await saveQuestion(eventId, customQuestions[itemIndex]);
    }
  }

  return (
    <div className={styles['builder-container']}>
      <div className={styles['quest-list']}>
        <div>Guest list</div>
        <div className={styles['purple-font']}>RSVP Form Builder</div>
      </div>
      <div className={styles['container']}>
        <div className={styles['approval-required']}>
          <div>Approval required</div>
          <div
            className={`${styles['toggle-button']} ${
              approvalReqired ? styles['active'] : ''
            }`}
            onClick={() => setApprovalRequired(prev => !prev)}
          >
            <div
              className={`${styles['toggle']} ${
                approvalReqired ? styles['active'] : ''
              }`}
            />
          </div>
        </div>
        <p>
          {`Guest will be automatically approved after form submission when
        'Approval required off'`}
        </p>
        <div className={styles['guest-registration']}>
          <div>Guest registration</div>
          <ul>
            <li>
              <Link href="pending" className={styles['pending-approval-card']}>
                0
                <span className={styles['pending-approval']}>
                  <Image
                    src={'/assets/events/rsvp/pending.svg'}
                    alt="pending"
                    width={20}
                    height={20}
                  />
                  Pending approval
                </span>
              </Link>
            </li>
            <li>
              <Link href="approved" className={styles['pending-approval-card']}>
                0
                <div className={styles['pending-approval']}>
                  <Image
                    src={'/assets/events/rsvp/approved.svg'}
                    alt="approved"
                    width={20}
                    height={20}
                  />
                  Approved
                </div>
              </Link>
            </li>
            <li>
              <Link href="rejected" className={styles['pending-approval-card']}>
                0
                <div className={styles['pending-approval']}>
                  <Image
                    src={'/assets/events/rsvp/rejected.svg'}
                    alt="rejected"
                    width={20}
                    height={20}
                  />
                  Rejected
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles['registration-question']}>
          <div>
            <div>Registration Questions</div>
            <div className={styles['profile-question']}>Profile Questions</div>
            <ol>
              <li>
                Full Name<div className={styles['necessary']}>Necessary</div>
              </li>
              <li>
                Nickname/Preferred Name
                <div className={styles['necessary']}>Necessary</div>
              </li>
              <li>
                Email (registered with Glimpse)
                <div className={styles['necessary']}>Necessary</div>
              </li>
              <li>
                Purpose of Participation
                <div className={styles['necessary']}>Necessary</div>
              </li>
              {presetQuestions.map((item, index) => (
                <li key={index}>
                  {`${item.question} ${item.type !== 'Text' ? ' (tag)' : ''}`}
                  <div
                    className={`${styles['toggle-button']} ${
                      item.isRequired ? styles['active'] : ''
                    }`}
                    onClick={() => changeIsRequired('preset', index)}
                  >
                    <div
                      className={`${styles['toggle']} ${
                        item.isRequired ? styles['active'] : ''
                      }`}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div>Custom Question</div>
            <ol>
              {customQuestions.map((item, index) => (
                <li key={index}>
                  {`${item.question} ${item.type !== 'Text' ? ' (tag)' : ''}`}
                  <div
                    className={`${styles['toggle-button']} ${
                      item.isRequired ? styles['active'] : ''
                    }`}
                    onClick={() => changeIsRequired('custom', index)}
                  >
                    <div
                      className={`${styles['toggle']} ${
                        item.isRequired ? styles['active'] : ''
                      }`}
                    />
                  </div>
                </li>
              ))}
            </ol>
            <button onClick={() => setShowModal(true)}>
              <Image
                src={'/assets/events/rsvp/plus.svg'}
                alt="plus"
                width={26.67}
                height={26.67}
              />
              Add Question
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <CustomQuestionModal
          eventId={eventId}
          onClose={closeModal}
          setCustomQuestions={setCustomQuestions}
        />
      )}
    </div>
  );
}
