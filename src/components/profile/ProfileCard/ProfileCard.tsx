import styles from './profileCard.module.scss';

interface Props {
  title: string;
  isShowProfileCard: boolean;
  children: React.ReactNode;
}

function ProfileCard({title, isShowProfileCard, children}: Props) {
  if (!isShowProfileCard) {
    return null;
  } else {
    return (
      <section>
        <section className={styles['title']}>
          <span>{title}</span>
        </section>
        <div className={styles['content-wrapper']}>{children}</div>
      </section>
    );
  }
}
export default ProfileCard;
