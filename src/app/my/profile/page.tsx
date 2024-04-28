'use client';
import {useProfileStore} from '@/stores/profile';
import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import Card from '@/components/card/Card';
import clsx from 'clsx';
import RoundPlustButton from './components/RoundPlustButton';
import {useWindowWidth} from '@/hooks/useWindowWidth';
import {useIsLoginStore} from '@/stores/auth';
import {useRouter} from 'next/navigation';
import {updateMyProfile} from '@/hooks/swr/useProfiles';

// RGL
import GridLayout from 'react-grid-layout';
import './rglStyle.css';
import {cardList as cardListData} from './tmpData';

export default function MyProfilePage() {
  // 로그인 유무 판단
  const router = useRouter();
  const isLogin = useIsLoginStore(state => state.isLogin);
  const profile = useProfileStore(state => state.profile);

  // profile 정보 할당
  const [userId, setUserId] = useState(0);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [regionId, setRegionId] = useState('');
  const [snsList, setSnsList] = useState(['']);
  const [profileCardList, setProfileCardList] = useState([]);
  const [cardPositionList, setCardPositionList] = useState<any>();
  const [userTag, setUserTag] = useState([]);

  useEffect(() => {
    const {
      id,
      familyName,
      givenName,
      introduction,
      profileCard,
      regionId,
      role,
      sns,
      userTag,
    } = profile;
    setUserId(id);
    setLastName(givenName);
    setFirstName(familyName);
    setIntroduction(introduction);
    setRole(role);
    setProfileCardList(profileCard);
    setRegionId(regionId);
    setSnsList(sns);
    setUserTag(userTag);
    console.log(profile);
  }, [profile]);

  const updateMyProfile = () => {
    const params = {
      region: 'string',
      department: 'string',
      familyName: 'string',
      givenName: 'string',
      introduction: 'string',
      belong: 'string',
      role: 'string',
      sns: [
        {
          type: 'Github',
          account: 'string',
        },
      ],
      profileCard: [
        {
          id: 0,
          type: 'string',
          content: 'string',
          sectionTitle: 'string',
          position: 'string',
        },
      ],
      userTag: ['string'],
    };
  };

  useEffect(() => {
    if (!isLogin) {
      router.push('/sign');
    }
  }, [isLogin]);

  useEffect(() => {
    const parsedCardPositionList = cardListData.map(data => {
      return data.position;
    });
    setCardPositionList(parsedCardPositionList);
  }, []);

  const windowWitdh = useWindowWidth();

  return (
    <div className={styles['my-profile-wrapper']}>
      <div className={styles['profile-image-wrapper']}>
        {profile?.image ? <div /> : <div className={styles['empty-image']} />}
        <div className={styles['add-image-btn']}>
          <Image
            src="/icons/picture.png"
            width={16}
            height={12}
            alt="picutre"
          />
        </div>
      </div>
      <div className={styles['name-area']}>
        <input maxLength={10} placeholder="Last Name" />
        <input maxLength={10} placeholder="First Name" />
      </div>
      <div className={styles['simple-introduce']}>
        <input placeholder="add bio..." />
      </div>
      <div className={styles['career-area-wrapper']}>
        <select>
          <option>department</option>
        </select>
        <div className={styles['devidor']} />
        <input placeholder="company" maxLength={15} />
      </div>
      <div className={styles['region-area']}>
        <Image
          src="/icons/Location.svg"
          width={16}
          height={16}
          alt="location"
        />
        <input value={'Seoul, Korea'} />
        <div className=""></div>
      </div>

      <GridLayout
        layout={cardPositionList}
        className={clsx([styles['box-wrapper'], styles['grid-wrapper']])}
        cols={2}
        rowHeight={120}
        width={windowWitdh - 60}
        onLayoutChange={e => {
          console.log(e);
        }}
      >
        {cardListData.map(card => {
          return (
            <div key={card.position.i} className={styles['grid-item-wrapper']}>
              <div className={styles['title-text']}>{card.sectionTitle}</div>
              <Card height={card.position.h * 120 - 24}>
                <div className={styles['card-inner']}>
                  <textarea />
                </div>
              </Card>
            </div>
          );
        })}
      </GridLayout>
      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>Connect</div>
        {snsList.map((_, idx) => {
          return (
            <Card height={64} key={idx}>
              <div className={styles['card-inner']}>
                <div className={styles['link-wrapper']}>
                  <div className={styles['empty-link']} />
                  <input placeholder="link add..." />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>Hashtag of interest</div>
        <Card height={384}>
          <div className={styles['card-inner']}>
            <textarea placeholder="Add your interests..." />
          </div>
        </Card>
      </div>

      <div className={styles['round-plus-button']}>
        <RoundPlustButton onClickBtn={() => {}} />
      </div>
    </div>
  );
}
