'use client';
import {useProfileStore} from '@/stores/profile';
import styles from './page.module.scss';
import {ChangeEvent, useEffect, useState} from 'react';
import Image from 'next/image';
import Card from '@/components/card/Card';
import clsx from 'clsx';
import RoundPlustButton from './components/RoundPlustButton';
import {useWindowWidth} from '@/hooks/useWindowWidth';
import {useIsLoginStore} from '@/stores/auth';
import {useRouter} from 'next/navigation';
import {updateMyProfile} from '@/hooks/swr/useProfiles';

// type
import {
  SnsType,
  ProfileCardType,
  ReactGridPositionType,
} from '@/types/profileType';

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
  const [region, setRegion] = useState('');
  const [snsList, setSnsList] = useState<SnsType[]>();
  const onChangeSnsList = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    if (snsList && snsList.length > 0) {
      const copySnsList = [...snsList];
      copySnsList[idx].account = e.target.value;
      setSnsList(() => copySnsList);
    }
  };
  const [profileCardList, setProfileCardList] = useState<ProfileCardType[]>([]);
  const [cardPositionList, setCardPositionList] = useState<any[]>([]);
  // const [cardPositionList, setCardPositionList] = useState<
  //   ReactGridPositionType[]
  // >([]);
  const [userTag, setUserTag] = useState([]);

  useEffect(() => {
    const {
      id,
      familyName,
      givenName,
      introduction,
      profileCard,
      region,
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
    setRegion(region);
    setSnsList(sns);
    setUserTag(userTag);
  }, [profile]);

  useEffect(() => {
    const parsedCardPositionList = profileCardList.map(data => {
      return JSON.parse(data.position);
    });
    setCardPositionList(parsedCardPositionList);
    console.log('cardPositionList: ', parsedCardPositionList);
  }, [profileCardList]);

  const onUpdateMyProfile = () => {
    const params = {
      userId: userId,
      region: 'Seoul, Korea',
      department: '부서',
      familyName: firstName,
      givenName: lastName,
      introduction: introduction,
      belong: 'Glimpse',
      role: role,
      sns: [
        {
          type: 'Github',
          account: 'jodie9596@gmail.com',
        },
      ],
      profileCard: [
        {
          id: 0,
          type: 'string',
          content: '내용이야',
          sectionTitle: '첫 타이틀',
          position: JSON.stringify({i: 'second', x: 1, y: 0, w: 1, h: 1}),
        },
      ],
      userTag: ['관심사'],
    };
    // updateMyProfile(params);
  };

  useEffect(() => {
    if (!isLogin) {
      router.push('/sign');
    }
  }, [isLogin]);

  const windowWitdh = useWindowWidth();

  return (
    <div className={styles['my-profile-wrapper']}>
      <div className={styles['profile-image-wrapper']}>
        {profile?.image ? <div /> : <div className={styles['empty-image']} />}
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
        <input value={'Seoul, Korea'} />
      </div>

      <GridLayout
        layout={cardPositionList}
        className={clsx([styles['box-wrapper'], styles['grid-wrapper']])}
        cols={2}
        rowHeight={120}
        width={windowWitdh - 60}
        onLayoutChange={e => {
          setCardPositionList(e);
        }}
      >
        {cardPositionList.map(card => {
          return (
            <div key={card.i} className={styles['grid-item-wrapper']}>
              <div className={styles['title-text']}>{card.i}</div>
              <Card height={card.h * 120 - 24}>
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
        {snsList &&
          snsList.map((snsData, idx) => {
            return (
              <Card height={64} key={idx}>
                <div className={styles['card-inner']}>
                  <div className={styles['link-wrapper']}>
                    <div className={styles['empty-link']} />
                    <input
                      placeholder="link add..."
                      value={snsData.account}
                      onChange={e => {
                        onChangeSnsList(e, idx);
                      }}
                    />
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
