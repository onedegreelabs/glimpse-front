import styles from './index.module.scss';
import TopPhoto from './sections/TopPhoto';
import TopInfo from './sections/TopInfo';
import MiddleControlSection from './sections/MiddleControlSection';
import UserList from './sections/UserList';

export default function EventDetailContainer() {
  return (
    <div className={styles['events-detail-wrapper']}>
      <TopPhoto />
      <TopInfo />
      <MiddleControlSection />
      <UserList />
    </div>
  );
}
