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
  introCarrer: boolean;
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
    introCarrer: false,
  });

  const changeCard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    if (name === 'introTitle') {
      setIntroTitle(prevState => ({...prevState, content: [value]}));
    } else {
      setIntroCareer(prevState => ({...prevState, content: [value]}));
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

  return (
    <ProfileCard title={'Intro'} isShowProfileCard={true}>
      {introTitle && introTitle.content.length > 0 && (
        <Card
          className={cn(
            'w-[136px] h-[136px] focus:ring-2 focus:outline-none border-solid border-[#7E51FD]'
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
                // onFocus={() =>
                //   setIsFocus(prevState => ({
                //     ...prevState,
                //     introTitle: !prevState.introTitle,
                //   }))
                // }
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
                value={introCareer.content}
                onFocus={() =>
                  setIsFocus(prevState => ({
                    ...prevState,
                    introCarrer: true,
                  }))
                }
                onChange={changeCard}
              />
            )}
          </div>
        </Card>
      )}
    </ProfileCard>
  );
}
