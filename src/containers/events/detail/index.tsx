import EventInfo from './sections/EventInfo';
import UserList from './sections/UserList';
import TopBanner from './sections/TopBanner';
import styles from './index.module.scss';
export default function EventDetailContainer() {
  return (
    <div className={styles['page-wrapper']}>
      <TopBanner />
      <EventInfo />
      <UserList />
    </div>
  );
}
