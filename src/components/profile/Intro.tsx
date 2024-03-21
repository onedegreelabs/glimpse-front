'use client';
import styles from './intro.module.scss';
import {useEffect, useState} from 'react';

// import Card from '@/components/card/Card';
import {IProfileCard} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {
  INTROCAREER,
  INTROTITLE,
} from '@/containers/my/profile/constans/profile';
import ProfileCard from '@/components/profile/ProfileCard/ProfileCard';
import {Card} from '../ui/card';
import {cn} from '@/lib/utils';

interface IntroCardProps {
  cards?: IProfileCard[];
  isOtherProfile: boolean;
}

interface IFocuse {
  [index: string]: boolean;
  introTitle: boolean;
  inTroCarrer: boolean;
}

export default function IntroCard({cards, isOtherProfile}: IntroCardProps) {
  const [introTitle, setIntroTitle] = useState<IProfileCard>({
    id: 0,
    type: 'INTROTITLE',
    content: ['리팩토링중'],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [introCareer, setIntroCareer] = useState<IProfileCard>({
    id: 0,
    type: 'INTROCAREER',
    content: ['일단 더미데이터 테스트중'],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [isFocus, setIsFocus] = useState<IFocuse>({
    introTitle: false,
    inTroCarrer: false,
  });

  const changeCard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name} = e.target;
    console.log('name', name);
    setIsFocus(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  useEffect(() => {
    if (cards !== undefined) {
      const introTitleCard = getCardsByType(cards, INTROTITLE);
      const introCareerCard = getCardsByType(cards, INTROCAREER);
      setIntroTitle(introTitleCard[0]);
      setIntroCareer(introCareerCard[0]);
    }
  }, [cards]);

  console.log('thi', isFocus);

  return (
    <ProfileCard title={'Intro'} isShowProfileCard={true}>
      {introTitle && introTitle.content.length > 0 && (
        <Card
          className={cn(
            'w-[136px] h-[136px]',
            isFocus['introTitle'] && 'border-solid border-[#7E51FD]'
          )}
        >
          <div className={styles['content']}>
            {isOtherProfile ? (
              <p>{introTitle.content}</p>
            ) : (
              <textarea
                name="introTitle"
                className={styles['content-textarea']}
                readOnly={isFocus.introTitle}
                onChange={changeCard}
              />
            )}
          </div>
        </Card>
      )}
      {introCareer && introCareer.content.length > 0 && (
        <Card
          className={cn(
            'w-[136px] h-[136px]',
            isFocus['introCarrer'] && 'border-solid border-[#7E51FD]'
          )}
        >
          <div className={styles['content']}>
            {isOtherProfile ? (
              <p>{introTitle.content}</p>
            ) : (
              <textarea
                name="introCarrer"
                className={styles['content-textarea']}
                readOnly={isFocus.introTitle}
                onChange={changeCard}
              />
            )}
          </div>
        </Card>
      )}
    </ProfileCard>
  );
}
