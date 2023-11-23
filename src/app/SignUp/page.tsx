import styles from './page.module.scss';
export default function SignUp() {
  return (
    <div className={styles['signup-wrapper']}>
      <div className={styles['title-area']}>Sign Up</div>
      <div className={styles['content-area']}>
        <div className={styles['content-text']}>Email *</div>
        <input className={styles['content-input']} />
      </div>
      <div className={styles['content-area']}>
        <div className={styles['content-text']}>Password *</div>
        <input className={styles['content-input']} />
      </div>
      <div className={styles['content-area']}>
        <div className={styles['content-text']}>Confirm password *</div>
        <input className={styles['content-input']} />
      </div>
      <div className={styles['button-area']}>
        <div className={styles['text-area']}>Sign Up</div>
      </div>
      <div className={styles['footer-area']}>
        <div className={styles['left-area']}>Already a member?</div>
        <div className={styles['right-area']}>Sign in</div>
      </div>
    </div>
  );
}
