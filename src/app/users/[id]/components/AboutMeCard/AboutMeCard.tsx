import Card from '@/components/Card/page';
import styles from './aboutMeCard.module.scss';
import {IProfileCard} from '@/types/profileType';
import {useEffect, useState} from 'react';
import getCardsByType from '@/utils/getCardsByType';
import {ABOUTME} from '@/app/profile/const/profile';

interface AboutMeCardProps {
  cards: IProfileCard[];
}

export default function AboutMeCard({cards}: AboutMeCardProps) {
  const [aboutMe, setAboutMe] = useState<IProfileCard>({
    id: 0,
    type: 'ABOUTME',
    content: [],
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
