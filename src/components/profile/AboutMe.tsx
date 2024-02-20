import styles from './aboutMe.module.scss';
import {useEffect, useState} from 'react';

import Card from '@/components/card/Card';
import {IProfileCard} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {ABOUTME} from '@/containers/my/profile/constans/profile';
import ProfileCard from './ProfileCard/ProfileCard';

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
    <ProfileCard title="About me" isShowProfileCard={true}>
      <Card height={168}>
        <div className={styles['content']}>
          <p>{aboutMe.content || ''}</p>
        </div>
      </Card>
    </ProfileCard>
  );
}
