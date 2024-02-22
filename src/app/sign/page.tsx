import SignContainer from '@/containers/sign';
import {verifyUser} from '@/services/user';
import {cookies} from 'next/headers';

export default async function SignPage() {
  const cookieStore = cookies();
  const user = await verifyUser(cookieStore.get('accessToken')?.value);

  return <SignContainer user={user} />;
}
