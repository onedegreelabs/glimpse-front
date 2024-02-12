import Card from '@/components/ui/card';
import styles from './introCard.module.scss';
import {IProfileCard} from '@/types/profileType';
import {useEffect, useState} from 'react';
import {getCardsByType} from '@/lib/utils';
import {INTROCAREER, INTROTITLE} from '@/app/(root)/profile/const/profile';

interface IntroCardProps {
  cards: IProfileCard[];
}

export default function IntroCard({cards}: IntroCardProps) {
  const [introTitle, setIntroTitle] = useState<IProfileCard>({
    id: 0,
    type: 'INTROTITLE',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });
  const [introCareer, setIntroCareer] = useState<IProfileCard>({
    id: 0,
    type: 'INTROCAREER',
    content: [],
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
    <>
      <div className={styles['title']}>
        <span>Intro</span>
      </div>
      <div className={styles['content-wrapper']}>
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
      </div>
    </>
  );
}
