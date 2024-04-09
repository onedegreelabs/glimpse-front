'use client';
import styles from './intro.module.scss';
import {useCallback, useEffect, useState} from 'react';

import {ProfileCardDto, UpdateProfileCardDto} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {
  INTROCAREER,
  INTROTITLE,
} from '@/containers/my/profile/constans/profile';
import ProfileCard from '@/components/profile/ProfileCard/ProfileCard';
import {Card} from '../ui/card';
import {cn} from '@/lib/utils';
import {useProfileStore} from '@/stores/profile';

interface IntroCardProps {
  cards: ProfileCardDto[];
  isOtherProfile: boolean;
}

export default function IntroCard({cards, isOtherProfile}: IntroCardProps) {
  const {profile, setProfile} = useProfileStore();
  const [introTitle, setIntroTitle] = useState<UpdateProfileCardDto>({
    id: 0,
    type: 'INTROTITLE',
    content: '',
  });
  const [introCareer, setIntroCareer] = useState<UpdateProfileCardDto>({
    id: 0,
    type: 'INTROCAREER',
    content: '',
  });

  const changeCard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    let updatedProfileCard;

    if (name === 'introTitle') {
      const introTitleCard = profile.profileCard.find(
        card => card.type === 'INTROTITLE'
      );
      if (introTitleCard) {
        updatedProfileCard = {
          ...profile,
          profileCard: profile.profileCard.map(card =>
            card.type === 'INTROTITLE' ? {...card, content: value} : card
          ),
        };
      } else {
        updatedProfileCard = {
          ...profile,
          profileCard: [
            ...profile.profileCard,
            {id: 0, type: 'INTROTITLE', content: value},
          ],
        };
      }
    } else {
      const introCareerCard = profile.profileCard.find(
        card => card.type === 'INTROCAREER'
      );
      if (introCareerCard) {
        updatedProfileCard = {
          ...profile,
          profileCard: profile.profileCard.map(card =>
            card.type === 'INTROCAREER' ? {...card, content: value} : card
          ),
        };
      } else {
        updatedProfileCard = {
          ...profile,
          profileCard: [
            ...profile.profileCard,
            {id: 0, type: 'INTROCAREER', content: value},
          ],
        };
      }
    }
    setProfile(updatedProfileCard);
  };

  console.log('profile', profile);
  useEffect(() => {
    if (cards !== undefined) {
      const introTitleCard = getCardsByType(cards, INTROTITLE);
      const introCareerCard = getCardsByType(cards, INTROCAREER);
      setIntroTitle(introTitleCard[0]);
      setIntroCareer(introCareerCard[0]);
    }
  }, [cards]);

  return (
    <ProfileCard title={'Intro'} isShowProfileCard={true}>
      <Card
        className={cn(
          'w-[136px] h-[136px] focus-within:border-solid border-[#7E51FD]'
        )}
      >
        <div className={styles['content']}>
          {isOtherProfile ? (
            <p>{introTitle?.content}</p>
          ) : (
            <textarea
              name="introTitle"
              className={styles['content-textarea']}
              value={introTitle?.content}
              onChange={changeCard}
            />
          )}
        </div>
      </Card>
      <Card
        className={cn(
          'w-[136px] h-[136px] focus-within:border-solid border-[#7E51FD]'
        )}
      >
        <div className={styles['content']}>
          {isOtherProfile ? (
            <p>{introTitle?.content}</p>
          ) : (
            <textarea
              name="introCarrer"
              className={styles['content-textarea']}
              value={introCareer?.content}
              onChange={changeCard}
            />
          )}
        </div>
      </Card>
    </ProfileCard>
  );
}
