'use client';
import React, {useState} from 'react';

import Container from '@/components/layouts/Container';
import MyProfileContainer from '@/containers/my/profile';
import FloatingButton from '@/containers/my/profile/components/FloatingButton/FloatingButton';

const MyProfilePage = () => {
  const [isShowAddInput, setIsShowAddInput] = useState(false);
  const [addTarget, setAddTarget] = useState('LINK');

  const onClickShowAddInput = (target: 'LINK' | 'HASHTAG') => {
    setIsShowAddInput(true);
    setAddTarget(target);
    document.body.style.overflow = 'hidden';
  };

  return (
    <Container>
      <MyProfileContainer
        isShowAddInput={isShowAddInput}
        addTarget={addTarget}
        setIsShowAddInput={setIsShowAddInput}
      />
      <div
        style={{position: 'absolute', top: 0, right: '60px', maxWidth: '375px'}}
      >
        <FloatingButton onClickShowAddInput={onClickShowAddInput} />
      </div>
    </Container>
  );
};

export default MyProfilePage;
