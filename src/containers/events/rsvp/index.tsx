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
            First Name (이름) <span> *</span>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Last Name (성) <span> *</span>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Role (직군) <span> *</span>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Organization (소속) <span> *</span>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>
            Experience (경력) <span> *</span>
          </label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-input']}>
          <label>Location (거주지역)</label>
          <input type="text" placeholder="Place holder" />
        </div>
        <div className={styles['rsvp-interest']}>
          <h2>Interest (관심사)</h2>
          <div className={styles['rsvp-checkbox-container']}>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="industry" />
              <label htmlFor="industry">Industry</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="role" />
              <label htmlFor="role">Role</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="self-development" />
              <label htmlFor="self-development">Self-Development</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="hobby" />
              <label htmlFor="hobby">Hobby</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="networking" />
              <label htmlFor="networking">Networking</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="career" />
              <label htmlFor="career">Career</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="skill" />
              <label htmlFor="skill">Skill</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="leadership" />
              <label htmlFor="leadership">Leadership</label>
            </div>
            <div className={styles['rsvp-checkbox']}>
              <input type="checkbox" id="problem-solving" />
              <label htmlFor="problem-solving">Problem Solving</label>
            </div>
          </div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
