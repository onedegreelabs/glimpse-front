import {useEffect, useState} from 'react';
import Image from 'next/image';
import {LINK} from '@/app/profile/const/profile';
import Card from '@/components/Card/page';
import {IProfileCard} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import styles from './connectCard.module.scss';
import clsx from 'clsx';
import getConnectImg from '@/utils/getConnectImg';

interface ConnectCardProps {
  cards: IProfileCard[];
}

export default function ConnectCard({cards}: ConnectCardProps) {
  const [connects, setConnects] = useState<IProfileCard>({
    id: 0,
    type: 'LINK',
    content: [],
    isVisible: true,
    color: '#FFFFFF',
  });

  useEffect(() => {
    if (cards !== undefined) {
      const connectCard = getCardsByType(cards, LINK);
      setConnects(connectCard[0]);
    }
  }, [cards]);

  return (
    <>
      {connects &&
        Array.isArray(connects.content) &&
        connects.content.length > 0 && (
          <>
            <div className={styles['title']}>
              <span>Connect</span>
            </div>
            <div className={clsx(styles['link-content-wrapper'])}>
              {Array.isArray(connects.content) &&
                connects.content.map((connect, index) => {
                  const connectImg = getConnectImg(connect);
                  return (
                    <Card height={64} key={`conent-${index}`}>
                      <div className={styles['link-content']}>
                        <Image
                          src={connectImg.src}
                          alt={connectImg.alt}
                          width={32}
                          height={32}
                        />
                        <span>{connect}</span>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </>
        )}
    </>
  );
}
