import styles from './index.module.scss';

export default function EventRsvpContainer() {
  return (
    <div className={styles['rsvp']}>
      <div className={styles['rsvp-container']}>
        <div className={styles['rsvp-title']}>
          <h1>Winter 2023 Party in NYC</h1>
          <p>Please answer this survey.</p>
        </div>
        <div className={styles['rsvp-required']}>Required *</div>
        <div className={styles['rsvp-input']}>
          <label>
            First Name (이름) <p> *</p>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Last Name (성) <p> *</p>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Role (직군) <p> *</p>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Organization (소속) <p> *</p>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Experience (경력) <p> *</p>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Location (거주지역) <p> *</p>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div>
          <label>Interest (관심사)</label>
          <div className={styles['rsvp-checkbox-container']}>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="industry" />
              <label htmlFor="industry">
                Industry
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="role" />
              <label htmlFor="role">
                Role
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="self-development" />
              <label htmlFor="self-development">
                Self-Development
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="hobby" />
              <label htmlFor="hobby">
                Hobby
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="networking" />
              <label htmlFor="networking">
                Networking
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="career" />
              <label htmlFor="career">
                Career
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="skill" />
              <label htmlFor="skill">
                Skill
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="leadership" />
              <label htmlFor="leadership">
                Leadership
                <div />
              </label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="problem-solving" />
              <label htmlFor="problem-solving">
                Problem Solving
                <div />
              </label>
            </div>
          </div>
        </div>
        <button>submit</button>
      </div>
    </div>
  );
}
