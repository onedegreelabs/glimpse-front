import React from 'react';
import {cookies} from 'next/headers';

import Container from '@/components/layouts/Container';
import MyProfileContainer from '@/containers/my/profile';

const MyProfilePage = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  console.log('accessToken?', accessToken);
  return (
    <Container>
      <MyProfileContainer />
    </Container>
  );
};

export default MyProfilePage;
