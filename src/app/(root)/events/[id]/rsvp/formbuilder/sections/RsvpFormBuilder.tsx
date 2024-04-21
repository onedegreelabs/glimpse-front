import Image from 'next/image';
import styles from './RsvpFormBulder.module.scss';

export default function RsvpFormBuilder() {
  return (
    <div className={styles['builder-container']}>
      <div className={styles['quest-list']}>
        <div>Guest list</div>
        <div className={styles['purple-font']}>RSVP Form Builder</div>
      </div>
      <div className={styles['container']}>
        <div className={styles['approval-required']}>
          <div>Approval required</div>
          <div className={styles['toggle-button']}>
            <div className={styles['toggle']} />
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
              <div className={styles['pending-approval-card']}>
                0
                <div className={styles['pending-approval']}>
                  <Image
                    src={'/assets/events/rsvp/no-check.svg'}
                    alt="check"
                    width={20}
                    height={20}
                  />
                  Pending approval
                </div>
              </div>
            </li>
            <li>
              <div className={styles['pending-approval-card']}>
                0
                <div className={styles['pending-approval']}>
                  <Image
                    src={'/assets/events/rsvp/check.svg'}
                    alt="check"
                    width={20}
                    height={20}
                  />
                  Pending approval
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles['registration-question']}>
          <div>Registration Questions</div>
          <div className={styles['profile-card-question']}>
            profile card Question
            <div className={styles['necessary']}>Necessary</div>
          </div>
          <ol>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Location</li>
            <li>Role</li>
            <li>Interest tag</li>
            <li>purpose of participation</li>
          </ol>
          <p>
            In order for guests to register for an event, they must answer the
            purpose of their participation, along with the following information
            in their profile.
          </p>
          <div className={styles['custom-question']}>
            <div>Custom Question</div>
            <button>
              <Image
                src={'/assets/events/rsvp/plus.svg'}
                alt="plus"
                width={26.67}
                height={26.67}
              />
              Add Question
            </button>
            <p>
              If the guest has additional questions to participate in the event,
              you can add them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
