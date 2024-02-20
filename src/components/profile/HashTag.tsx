import styles from './hashtag.module.scss';
import { useEffect, useState } from 'react';

import Card from '@/components/card/Card';
import Chip from '@/components/chip/Chip';
import { IProfileCard } from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import { HASHTAG } from '@/containers/my/profile/constans/profile';
import ProfileCard from './ProfileCard/ProfileCard';

interface HashTagCardProps {
  cards: IProfileCard[];
}

export default function HashTagCard({ cards }: HashTagCardProps) {
  const [hashTags, setHashTags] = useState<IProfileCard>({
    id: 0,
    type: 'HASHTAG',
    content: ['강아지', '고양이'],
    isVisible: true,
    color: '#FFFFFF'
  });

  useEffect(() => {
    if (cards !== undefined) {
      const hashTagCard = getCardsByType(cards, HASHTAG);
      setHashTags(hashTagCard[0]);
    }
  }, [cards]);

  return (
    <ProfileCard title="Hashtag of interest" isShowProfileCard={true}>
      <Card height={358}>
        <div className={styles['content-wrapper']}>
          <div className={styles['hashtag-content']}>
            {Array.isArray(hashTags.content) &&
              hashTags.content.map((tag, index) => (
                <Chip key={`hashTag-${index}`} label={tag} height={24} backgroundColor={'#D9D9D9'} borderRadius={4} />
              ))}
          </div>
        </div>
      </Card>
    </ProfileCard>
  );
}
