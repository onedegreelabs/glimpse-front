'use client';
import {useState} from 'react';
import Image from 'next/image';

import styles from './RsvpFormBulder.module.scss';
import CustomQuestionModal from '../../components/CustomQuestionModal/CustomQuestionModal';
import Link from 'next/link';

export default function RsvpFormBuilder() {
  const [showModal, setShowModal] = useState(false);
  const [toggle, setToggle] = useState(false);

  function closeModal() {
    setShowModal(false);
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
            <li>
              Location
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
            </li>
            <li>
              Specialization
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
            </li>
            <li>
              Company
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
            </li>
            <li>
              Interest (tag)
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
            </li>
          </ol>
          <div className={styles['custom-question']}>
            <div>Custom Question</div>
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
      {showModal && <CustomQuestionModal onClose={closeModal} />}
    </div>
  );
}
