'use client';
import {useProfileStore} from '@/stores/profile';
import styles from './page.module.scss';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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

export default function MyProfilePage() {
  // 로그인 유무 판단
  const router = useRouter();
  const isLogin = useIsLoginStore(state => state.isLogin);
  const profile = useProfileStore(state => state.profile);

  useEffect(() => {
    if (!isLogin) {
      router.push('/sign');
    }
  }, [isLogin]);

  // profile 정보 할당
  const [userId, setUserId] = useState(0);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [region, setRegion] = useState('');
  const [snsList, setSnsList] = useState<SnsType[]>();
  const [profileCardList, setProfileCardList] = useState<ProfileCardType[]>([]);
  const [cardPositionList, setCardPositionList] = useState<any[]>([]); //type 설정 필요
  const [userTag, setUserTag] = useState<string[]>([]);

  let setter: Dispatch<SetStateAction<string[]>> | null;
  const onCreateCard = () => {
    if (setter) {
      setter(prev => [...prev, '']);
    }
  };

  const onChangeSnsList = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    if (snsList && snsList.length > 0) {
      const copySnsList = [...snsList];
      copySnsList[idx].account = e.target.value;
      setSnsList(() => copySnsList);
    }
  };

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
      sns: snsList,
      profileCard: profileCardList,
      userTag: userTag,
    };
    console.log(params);
    // updateMyProfile(params);
  };

  // card 넓이 반응형으로 조정 위해 현재 윈도우 값 필요
  const windowWitdh = useWindowWidth();

  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const addTagItem = async e => {
    await setUserTag(prev => [...prev, e.target.value]);
    if (tagInputRef.current) {
      tagInputRef.current.value = '';
    }
  };
  useEffect(() => {
    if (tagInputRef.current) {
      const tagInputEl = tagInputRef.current;
      const handleKeyDown = function (e: {
        key: string;
        preventDefault: () => void;
      }) {
        if (e.key === 'Enter') {
          e.preventDefault();
          addTagItem(e);
        }
      };
      tagInputEl.addEventListener('keydown', handleKeyDown);
      return () => {
        tagInputEl.removeEventListener('keydown', handleKeyDown);
      };
    }
    return;
  }, []);

  const onDeleteTagItem = (idx: number) => {
    const copyUserTag = [...userTag];
    const deletedUserTag = copyUserTag.filter((item, i) => {
      return i !== idx;
    });
    setUserTag(deletedUserTag);
  };

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
          <div className={clsx([styles['card-inner'], styles['for-tag']])}>
            <input placeholder="Add your interests..." ref={tagInputRef} />
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
                      onClick={() => {
                        onDeleteTagItem(i);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      <div className={styles['round-plus-button']}>
        <RoundPlustButton onClickBtn={() => {}} />
      </div>
    </div>
  );
}
