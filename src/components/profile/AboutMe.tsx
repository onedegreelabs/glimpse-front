import styles from './aboutMe.module.scss';
import {useEffect, useState} from 'react';
import {useProfileStore} from '@/stores/profile';
import {ProfileCardDto, UpdateProfileCardDto} from '@/types/profileType';
import getCardsByType from '@/utils/getCardsByType';
import {ABOUTME} from '@/containers/my/profile/constans/profile';
import ProfileCard from './ProfileCard/ProfileCard';
import {cn} from '@/lib/utils';
import {Card} from '../ui/card';

interface AboutMeCardProps {
  cards: ProfileCardDto[];
  isOtherProfile: boolean;
}

export default function AboutMeCard({cards, isOtherProfile}: AboutMeCardProps) {
  const {profile, setProfile} = useProfileStore();
  const [aboutMe, setAboutMe] = useState<UpdateProfileCardDto>({
    id: 0,
    type: 'ABOUTME',
    content: '',
  });

  const changeCard = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;

    const aboutMeCardIndex = profile.profileCard.findIndex(
      card => card.type === 'ABOUTME'
    );

    if (aboutMeCardIndex === -1) {
      const newAboutMeCard: ProfileCardDto = {
        id: 0,
        type: 'ABOUTME',
        content: value,
      };
      const updatedProfileCard = [...profile.profileCard, newAboutMeCard];
      const updatedProfile = {...profile, profileCard: updatedProfileCard};
      setProfile(updatedProfile);
    } else {
      const updatedProfileCard = profile.profileCard.map(card =>
        card.type === 'ABOUTME' ? {...card, content: value} : card
      );
      const updatedProfile = {...profile, profileCard: updatedProfileCard};
      setProfile(updatedProfile);
    }

    // aboutMe 상태 업데이트
    setAboutMe(prevState => ({...prevState, content: value}));
  };

  useEffect(() => {
    if (cards !== undefined) {
      const aboutMeCard = getCardsByType(cards, ABOUTME);
      if (aboutMeCard.length > 0) {
        setAboutMe(aboutMeCard[0]);
      }
    }
  }, [cards]);

  return (
    <ProfileCard title="About me" isShowProfileCard={true}>
      <Card
        className={cn(
          'w-[343px] h-[168px] focus-within:border-solid border-[#7E51FD]'
        )}
      >
        <div className={styles['content']}>
          {isOtherProfile ? (
            <p>{aboutMe.content}</p>
          ) : (
            <textarea
              name="aboutMe"
              className={styles['content-textarea']}
              onChange={changeCard}
              value={aboutMe.content}
            />
          )}
        </div>
      </Card>
    </ProfileCard>
  );
}
