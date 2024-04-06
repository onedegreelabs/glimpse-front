'use client';
import styles from './connect.module.scss';
import clsx from 'clsx';
import Image from 'next/image';
import {useEffect, useState} from 'react';

import Card from '@/components/card/Card';
import {ProfileCardDto} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import getConnectImg from '@/utils/getConnectImg';
import {LINK} from '@/containers/my/profile/constans/profile';
import ProfileCard from './ProfileCard/ProfileCard';

interface ConnectCardProps {
  cards: ProfileCardDto[];
  isOtherProfile: boolean;
}

export default function ConnectCard({cards}: ConnectCardProps) {
  const [connects, setConnects] = useState<ProfileCardDto>({
    createdAt: '',
    updatedAt: '',
    id: 0,
    userId: 1,
    type: 'LINK',
    content: '',
  });

  useEffect(() => {
    if (cards !== undefined) {
      const connectCard = getCardsByType(cards, LINK);
      setConnects(connectCard[0]);
    }
  }, [cards]);

  return (
    <ProfileCard title="Connect" isShowProfileCard={true}>
      <div className={clsx(styles['link-content-wrapper'])}>
        {connects?.content &&
          Array.isArray(connects.content) &&
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
    </ProfileCard>
  );
}
