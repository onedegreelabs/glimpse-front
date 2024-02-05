import styles from './aboutMe.module.scss';
import {useEffect, useState} from 'react';

import Card from '@/components/Card/page';
import {IProfileCard} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {ABOUTME} from '@/containers/my/profile/constans/profile';

interface AboutMeCardProps {
  cards: IProfileCard[];
}

export default function AboutMeCard({cards}: AboutMeCardProps) {
  const [aboutMe, setAboutMe] = useState<IProfileCard>({
    id: 0,
    type: 'ABOUTME',
    content: ['UI테스트중'],
    isVisible: true,
    color: '#FFFFFF',
  });

  useEffect(() => {
    if (cards !== undefined) {
      const aboutMeCard = getCardsByType(cards, ABOUTME);
      setAboutMe(aboutMeCard[0]);
    }
  }, [cards]);

  return (
    <>
      {aboutMe && aboutMe.content.length > 0 && (
        <>
          <div className={styles['title']}>
            <span>About me</span>
          </div>
          <div className={styles['content-wrapper']}>
            <Card height={168}>
              <div className={styles['content']}>
                <p>{aboutMe.content || ''}</p>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
