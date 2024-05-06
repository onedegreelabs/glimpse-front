'use client';
import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import Card from '@/components/card/Card';
import clsx from 'clsx';

// type
import {SnsType, ProfileCardType} from '@/types/profileType';
import {usePathname} from 'next/navigation';
import {useUserProfile} from '@/hooks/swr/useProfiles';

export default function ProfilePage() {
  const pathname = usePathname();
  const pathnameList = pathname?.split('/');
  const userId = Number(pathnameList?.[pathnameList.length - 1]);
  const userProfile = useUserProfile(userId);

  // profile 정보 할당
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [region, setRegion] = useState('');
  const [snsList, setSnsList] = useState<SnsType[]>();
  const [profileCardList, setProfileCardList] = useState<ProfileCardType[]>([]);
  const [userTag, setUserTag] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState();

  useEffect(() => {
    if (userProfile?.data?.data) {
      const profileData = userProfile.data.data;
      const {
        familyName,
        givenName,
        introduction,
        profileCard,
        region,
        role,
        sns,
        userTag,
      } = profileData;
      setLastName(givenName);
      setFirstName(familyName);
      setIntroduction(introduction);
      setRole(role);
      setProfileCardList(profileCard);
      setRegion(region);
      setSnsList(sns);
      setUserTag(userTag);
    }
  }, [userProfile]);

  return (
    <div className={styles['my-profile-wrapper']}>
      <div className={styles['profile-image-wrapper']}>
        {profileImage ? <div /> : <div className={styles['empty-image']} />}
        <div className={styles['add-image-btn']}>
          <Image
            src="/icons/picture.svg"
            width={16}
            height={12}
            alt="picutre"
          />
        </div>
      </div>
      <div className={styles['name-area']}>
        <input
          maxLength={10}
          placeholder="Last Name"
          value={lastName}
          onChange={e => {
            setLastName(e.target.value);
          }}
        />
        <input
          maxLength={10}
          placeholder="First Name"
          value={firstName}
          onChange={e => {
            setFirstName(e.target.value);
          }}
        />
      </div>
      <div className={styles['simple-introduce']}>
        <input
          placeholder="add bio..."
          value={introduction}
          onChange={e => {
            setIntroduction(e.target.value);
          }}
        />
      </div>
      <div className={styles['career-area-wrapper']}>
        <select>
          <option>department</option>
        </select>
        <div className={styles['devidor']} />
        <input
          placeholder="company"
          maxLength={15}
          value={role}
          onChange={e => {
            setRole(e.target.value);
          }}
        />
      </div>
      <div className={styles['region-area']}>
        <Image
          src="/icons/Location.svg"
          width={16}
          height={16}
          alt="location"
        />
        <input value={'Seoul, Korea'} onChange={() => {}} />
      </div>

      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>Connect</div>
        <div className={styles['sns-wrapper']}>
          {snsList &&
            snsList.map((snsData, idx) => {
              return (
                <Card height={64} key={idx}>
                  <div className={styles['card-inner']}>
                    <div className={styles['link-wrapper']}>
                      <div className={styles['empty-link']} />
                      {snsData.account}
                    </div>
                  </div>
                </Card>
              );
            })}
        </div>
      </div>
      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>Hashtag of interest</div>
        <Card height={384}>
          <div className={clsx([styles['card-inner'], styles['for-tag']])}>
            <div className={styles['tag-item-wrapper']}>
              {userTag.map((tag, i) => {
                return (
                  <div className={styles['tag-item']} key={i}>
                    {tag}
                    <Image
                      src="/icons/delete.svg"
                      width={24}
                      height={24}
                      alt="delete-button"
                      className={styles['close-btn']}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
