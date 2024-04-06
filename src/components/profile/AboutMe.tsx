'use client';
import styles from './aboutMe.module.scss';
import {useEffect, useState} from 'react';

import {ProfileCardDto} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {ABOUTME} from '@/containers/my/profile/constans/profile';
import ProfileCard from './ProfileCard/ProfileCard';
import {cn} from '@/lib/utils';
import {Card} from '../ui/card';

interface AboutMeCardProps {
  cards: ProfileCardDto[];
  isOtherProfile: boolean;
}

export default function AboutMeCard({cards, isOtherProfile}: AboutMeCardProps) {
  const [aboutMe, setAboutMe] = useState<ProfileCardDto>({
    createdAt: '',
    updatedAt: '',
    id: 0,
    userId: 1,
    type: 'ABOUTME',
    content: '',
  });

  const changeCard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    setAboutMe(prevState => ({...prevState, content: value}));
  };

  useEffect(() => {
    if (cards !== undefined) {
      const aboutMeCard = getCardsByType(cards, ABOUTME);
      setAboutMe(aboutMeCard[0]);
    }
  }, [cards]);

  return (
    <ProfileCard title="About me" isShowProfileCard={true}>
      <Card
        className={cn(
          'w-[343px] h-[168px] focus-within:border-solid border-[#7E51FD]'
        )}
      >
        <div className={styles['content']}>
          {isOtherProfile ? (
            <p>{aboutMe.content}</p>
          ) : (
            <textarea
              name="aboutMe"
              className={styles['content-textarea']}
              onChange={changeCard}
            />
          )}
        </div>
      </Card>
    </ProfileCard>
  );
}
