import styles from './page.scss';
import {useEffect, useState} from 'react';

import Card from '@/components/Card/page';
import Chip from '@/components/Chip/page';
import {IProfileCard} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {HASHTAG} from '@/app/profile/const/profile';

interface HashTagCardProps {
  cards: IProfileCard[];
}

export default function HashTagCard({cards}: HashTagCardProps) {
  const [hashTags, setHashTags] = useState<IProfileCard>({
    id: 0,
    type: 'HASHTAG',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });

  useEffect(() => {
    if (cards !== undefined) {
      const hashTagCard = getCardsByType(cards, HASHTAG);
      setHashTags(hashTagCard[0]);
    }
  }, [cards]);

  return (
    <>
      {hashTags &&
        Array.isArray(hashTags.content) &&
        hashTags.content.length > 0 && (
          <>
            <div className={styles['title']}>
              <span> Hashtag of interest </span>
            </div>
            <div>
              <Card height={358}>
                <div className={styles['content-wrapper']}>
                  <div className={styles['hashtag-content']}>
                    {Array.isArray(hashTags.content) &&
                      hashTags.content.map((tag, index) => (
                        <Chip
                          key={`hashTag-${index}`}
                          label={tag}
                          height={24}
                          backgroundColor={'#D9D9D9'}
                          borderRadius={4}
                        />
                      ))}
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
    </>
  );
}
