import EventInfo from './sections/EventInfo';
import MiddleControlSection from './sections/MiddleControlSection';
import UserList from './sections/UserList';
import TopBanner from './sections/TopBanner';

export default function EventDetailContainer() {
  return (
    <>
      <TopBanner />
      <EventInfo />
      <MiddleControlSection />
      <UserList />
    </>
  );
}
