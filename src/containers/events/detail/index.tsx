import styles from './index.module.scss';
import EventInfo from './sections/EventInfo';
import MiddleControlSection from './sections/MiddleControlSection';
import UserList from './sections/UserList';
import TopBanner from './sections/TopBanner';

export default function EventDetailContainer() {
  return (
    <div className={styles['events-detail-wrapper']}>
      <TopBanner />
      <EventInfo />
      <MiddleControlSection />
      <UserList />
    </div>
  );
}
