import Link from 'next/link';
import clsx from 'clsx';
import styles from './page.module.scss';
import Card from '@/components/Card/page';
export default function SignUp() {
  return (
    <div className={styles['signup-wrapper']}>
      <div className={styles['logo-area']}>
        <div className={styles['text-area']}>Glimpse</div>
      </div>
      <div className={styles['card-wrapper']}>
        <Card>
          <div className={styles['card-area']}>
            <div className={styles['card-top']}>
              <div className={styles['top-title']}>Welcome to glimpse!</div>
              <div className={styles['top-sub-title']}>
                <div>Create a profile card to interact with event</div>
                <div>participnats!</div>
              </div>
            </div>
            <div className={styles['card-body']}>
              <div
                className={clsx(styles['button-area'], styles['email-color'])}
              >
                Sign up with email
              </div>
              <div className={styles['button-text']}>OR</div>
              <div
                className={clsx(styles['button-area'], styles['apple-color'])}
              >
                Sign up with apple
              </div>
              <div className={styles['button-space']} />
              <div
                className={clsx(styles['button-area'], styles['google-color'])}
              >
                Sign up with google
              </div>
            </div>
            <div className={styles['card-bottom']}>
              <div className={styles['bottom-left']}>Already a member?</div>
              <div className={styles['bottom-right']}>Sign in</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
