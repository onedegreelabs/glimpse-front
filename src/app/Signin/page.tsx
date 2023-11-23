import Image from 'next/image';
import styles from './page.module.scss';
import Link from 'next/link';
export default function Signin() {
  return (
    <div className={styles['signin-wrapper']}>
      <div className={styles['title-area']}>
        <div className={styles['title-image']}></div>
        <div className={styles['title-content']}>
          <div>Sign into your</div>
          <div>account</div>
        </div>
      </div>
      <div className={styles['content-area']}>
        <div className={styles['content-text']}>Email *</div>
        <input className={styles['content-input']} />
      </div>
      <div className={styles['content-area']}>
        <div className={styles['content-text']}>password *</div>
        <input className={styles['content-input']} />
      </div>
      <div className={styles['button-area']}>
        <div className={styles['text-area']}>Sign In</div>
      </div>
      <div className={styles['sub-title-area']}>Forget password</div>
      <div className={styles['footer-area']}>
        <div className={styles['left-area']}>Not a member?</div>
        <Link href="/Signup" className={styles['right-area']}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
