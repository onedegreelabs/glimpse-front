import Card from '@/components/card/page';
import styles from './page.module.scss';
import Link from 'next/link';
import Button from '@/components/button/page';
export default function Signin() {
  return (
    <div className={styles['signin-wrapper']}>
      <div className={styles['signin-header']}>
        <div className={styles['logo-area']}>
          <div className={styles['text-area']}>Glimpse</div>
        </div>
      </div>
      <Card width={334} height={415}>
        <div className={styles['card-wrapper']}>
          <div className={styles['card-title']}>Welcome to glimpse!</div>
          <div className={styles['card-sub-title']}>
            Create a profile card to interact with participants!
          </div>
          <div className={styles['card-body']}>
            <input
              className={styles['email-input']}
              placeholder="email address"
            ></input>
            <Button
              color="ffffff"
              bgColor="868686"
              text="Continue with email"
            />
            <div className={styles['text-area']}>OR</div>
            <Button color="ffffff" bgColor="000000" text="Sign in with apple" />
            <Button
              color="ffffff"
              bgColor="0094FF"
              text="Sign in with google"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
