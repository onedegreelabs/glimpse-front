import Link from 'next/link';
import styles from './page.module.scss';
export default function Login() {
  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['title-area']}>Sign Up</div>
      <div className={styles['button-linkedIn']}>
        <div className={styles['text-area']}>in Sign up with LinkedIn</div>
      </div>
      <div className={styles['button-email']}>
        <Link href="/Signup" className={styles['text-area']}>
          Sign up with email
        </Link>
      </div>
      <div className={styles['footer-area']}>
        <div className={styles['left-area']}>Already a member?</div>
        <Link href="/Signin" className={styles['right-area']}>
          Sign in
        </Link>
      </div>
    </div>
  );
}
