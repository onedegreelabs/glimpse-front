import Container from '@/components/layouts/Container';
import ProfilesContainer from '@/containers/profiles';
import React from 'react';

type PageParams = {
  id: string;
};

const OtherProfilePage = ({params}: {params: PageParams}) => {
  return (
    <Container>
      <ProfilesContainer id={params.id} />
    </Container>
  );
};

export default OtherProfilePage;
