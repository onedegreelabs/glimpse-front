'use client';
import styles from './aboutMe.module.scss';
import {useEffect, useState} from 'react';

import {IProfileCard} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {ABOUTME} from '@/containers/my/profile/constans/profile';
import ProfileCard from './ProfileCard/ProfileCard';
import {Card} from '../ui/card';
import {cn} from '@/lib/utils';

interface AboutMeCardProps {
  cards?: IProfileCard[];
  isOtherProfile: boolean;
}

export default function AboutMeCard({cards, isOtherProfile}: AboutMeCardProps) {
  const [aboutMe, setAboutMe] = useState<IProfileCard>({
    id: 0,
    type: 'ABOUTME',
    content: ['UI테스트중'],
    isVisible: true,
    color: '#FFFFFF',
  });

  const changeCard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    setAboutMe(prevState => ({...prevState, content: [value]}));
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
          'w-[343px] h-[168px] focus:ring-2 focus:outline-none border-solid border-[#7E51FD]'
        )}
      >
        <div className={styles['content']}>
          {isOtherProfile ? (
            <p>{aboutMe.content || ''}</p>
          ) : (
            <textarea
              name="aboutme"
              className={styles['content-textarea']}
              value={aboutMe.content}
              onChange={changeCard}
            />
          )}
        </div>
      </Card>
    </ProfileCard>
  );
}
