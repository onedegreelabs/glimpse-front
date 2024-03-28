'use client';
import styles from './intro.module.scss';
import {useEffect, useState} from 'react';

// import Card from '@/components/card/Card';
import {IProfileCard, ProfileCardDto} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {
  INTROCAREER,
  INTROTITLE,
} from '@/containers/my/profile/constans/profile';
import ProfileCard from '@/components/profile/ProfileCard/ProfileCard';
import {Card} from '../ui/card';
import {cn} from '@/lib/utils';

interface IntroCardProps {
  cards?: ProfileCardDto[];
  isOtherProfile: boolean;
}

export default function IntroCard({cards, isOtherProfile}: IntroCardProps) {
  const [introTitle, setIntroTitle] = useState<ProfileCardDto>({
    createdAt: '',
    updatedAt: '',
    id: 0,
    userId: 1,
    type: 'INTROTITLE',
    content: '',
  });
  const [introCareer, setIntroCareer] = useState<ProfileCardDto>({
    createdAt: '',
    updatedAt: '',
    id: 0,
    userId: 1,
    type: 'INTROCAREER',
    content: '',
  });

  const changeCard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    if (name === 'introTitle') {
      setIntroTitle(prevState => ({...prevState, content: value}));
    } else {
      setIntroCareer(prevState => ({...prevState, content: value}));
    }
  };

  useEffect(() => {
    if (cards !== undefined) {
      const introTitleCard = getCardsByType(cards, INTROTITLE);
      const introCareerCard = getCardsByType(cards, INTROCAREER);
      setIntroTitle(introTitleCard[0]);
      setIntroCareer(introCareerCard[0]);
    }
  }, [cards]);

  if (!introTitle || !introCareer) {
    return null;
  } else {
    return (
      <ProfileCard title={'Intro'} isShowProfileCard={true}>
        {introTitle.content.length > 0 && (
          <Card
            className={cn(
              'w-[136px] h-[136px] focus-within:border-solid border-[#7E51FD]'
            )}
          >
            <div className={styles['content']}>
              {isOtherProfile ? (
                <p>{introTitle.content}</p>
              ) : (
                <textarea
                  name="introTitle"
                  className={styles['content-textarea']}
                  value={introTitle.content}
                  onChange={changeCard}
                />
              )}
            </div>
          </Card>
        )}
        {introCareer.content.length > 0 && (
          <Card
            className={cn(
              'w-[136px] h-[136px] focus-within:border-solid border-[#7E51FD]'
            )}
          >
            <div className={styles['content']}>
              {isOtherProfile ? (
                <p>{introTitle.content}</p>
              ) : (
                <textarea
                  name="introCarrer"
                  className={styles['content-textarea']}
                  value={introCareer.content}
                  onChange={changeCard}
                />
              )}
            </div>
          </Card>
        )}
      </ProfileCard>
    );
  }
}
