import EventInfo from './sections/EventInfo';
import UserList from './sections/UserList';
import TopBanner from './sections/TopBanner';

export default function EventDetailContainer() {
  return (
    <>
      <TopBanner />
      <EventInfo />
      <UserList />
    </>
  );
}
