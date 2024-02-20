import styles from './intro.module.scss';
import {useEffect, useState} from 'react';

import Card from '@/components/card/Card';
import {IProfileCard} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {
  INTROCAREER,
  INTROTITLE,
} from '@/containers/my/profile/constans/profile';
import ProfileCard from '@/components/profile/ProfileCard/ProfileCard';

interface IntroCardProps {
  cards: IProfileCard[];
}

export default function IntroCard({cards}: IntroCardProps) {
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
        <Card height={168}>
          <div className={styles['content']}>
            <p>{introTitle.content}</p>
          </div>
        </Card>
      )}
      {introCareer && introCareer.content.length > 0 && (
        <Card height={168}>
          <div className={styles['content']}>
            <p>{introCareer.content}</p>
          </div>
        </Card>
      )}
    </ProfileCard>
  );
}
