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
import {SnsType, ProfileCardType} from '@/types/profileType';

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
  const [userName, setUserName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [role, setRole] = useState('');
  const [snsList, setSnsList] = useState<SnsType[]>([]);
  const [profileCardList, setProfileCardList] = useState<ProfileCardType[]>([]);
  const [cardPositionList, setCardPositionList] = useState<any[]>([]); //type 설정 필요
  const [userTag, setUserTag] = useState<string[]>([]);
  const [newCardNum, setNewCardNum] = useState(0);

  useEffect(() => {
    const {id, name, introduction, profileCard, role, sns, userTag} = profile;
    setUserId(id);
    setUserName(name);
    setIntroduction(introduction);
    setRole(role);
    setProfileCardList(profileCard);
    setSnsList(sns);
    setUserTag(userTag);
    const parsedCardPositionList = getCardPositionList(profileCard);
    setCardPositionList(parsedCardPositionList);
  }, [profile]);

  type SetterType =
    | Dispatch<SetStateAction<SnsType[]>>
    | Dispatch<SetStateAction<ProfileCardType[]>>
    | null;

  let setter: SetterType = null;

  // 카드 로직
  const onCreateCard = () => {
    if (setter === setSnsList) {
      const newValue: SnsType = {type: '', account: ''};
      setter(prev => [...prev, newValue]);
    } else if (setter === setProfileCardList) {
      const nextCardPosition = {
        i: `new Title${newCardNum ?? newCardNum}`,
        x: 0,
        y: 0,
        w: 1,
        h: 1,
      };
      setNewCardNum(newCardNum + 1);
      const nextCardItem = {
        content: '',
        position: JSON.stringify(nextCardPosition),
        sectionTitle: nextCardPosition.i,
        type: 'string',
      };
      setter((prev: ProfileCardType[]) => [...prev, nextCardItem]);
      const newCardPositionList = getCardPositionList([
        ...profileCardList,
        nextCardItem,
      ]);
      setCardPositionList(newCardPositionList);
    }
  };

  const resetSetter = () => {
    setTimeout(() => {
      setter = null;
    }, 100);
  };

  const onChangeCardList = (
    e: ChangeEvent<HTMLTextAreaElement>,
    idx: number
  ) => {
    if (profileCardList && profileCardList.length > 0) {
      const copyCardList = [...profileCardList];
      copyCardList[idx].content = e.target.value;
      setProfileCardList(() => copyCardList);
    }
  };

  const onChangeSnsList = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    if (snsList && snsList.length > 0) {
      const copySnsList = [...snsList];
      copySnsList[idx].account = e.target.value;
      setSnsList(() => copySnsList);
    }
  };

  const getCardPositionList = (cardListData: ProfileCardType[]) => {
    const parsedCardPositionList = cardListData.map((data: ProfileCardType) => {
      return JSON.parse(data.position);
    });
    return parsedCardPositionList;
  };

  useEffect(() => {
    if (cardPositionList.length > 0) {
      const newProfileCardList = profileCardList.map((card, idx) => {
        const newCard = JSON.parse(JSON.stringify(card));
        newCard.position = JSON.stringify(cardPositionList[idx]);
        newCard.sectionTitle = cardPositionList[idx].i;
        return newCard;
      });

      setProfileCardList(newProfileCardList);
    }
  }, [cardPositionList]);

  // card 넓이 반응형으로 조정 위해 현재 윈도우 값 필요
  const windowWitdh = useWindowWidth();

  const tagInputRef = useRef<HTMLInputElement | null>(null);
  const addTagItem = async (e: any) => {
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

  const onDeleteSnsItem = (idx: number) => {
    if (snsList && snsList.length > 1) {
      const copySnsList = [...snsList];
      const deletedSnsList = copySnsList.filter((item, i) => {
        return i !== idx;
      });
      setSnsList(deletedSnsList);
    }
  };

  const onDeleteTagItem = (idx: number) => {
    const copyUserTag = [...userTag];
    const deletedUserTag = copyUserTag.filter((item, i) => {
      return i !== idx;
    });
    setUserTag(deletedUserTag);
  };

  const onUpdateMyProfile = () => {
    const params = {
      userId: userId,
      region: 'Seoul, Korea',
      department: '부서',
      name: userName,
      introduction: introduction,
      belong: 'Glimpse',
      role: role,
      sns: snsList,
      profileCard: profileCardList,
      userTag: userTag,
    };

    updateMyProfile(params);
  };

  const [focusedCardTitleIdx, setFocusedCardTitleIdx] = useState<null | number>(
    null
  );

  const changeCardTitleValue = (idx: number) => {
    setFocusedCardTitleIdx(idx);
    setFocusedCardTitle(cardPositionList[idx].i);
  };

  const [focusedCardTitle, setFocusedCardTitle] = useState('');

  const updateCardTitle = (idx: number) => {
    const copyCardPositionList = [...cardPositionList];
    copyCardPositionList[idx].i = focusedCardTitle;
    setCardPositionList(() => copyCardPositionList);
    setFocusedCardTitle('');
    setFocusedCardTitleIdx(null);
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
          placeholder="user Name"
          value={userName || ''}
          onChange={e => {
            setUserName(e.target.value);
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
        {cardPositionList.map((card, idx) => {
          return (
            <div key={card.i} className={styles['grid-item-wrapper']}>
              <input
                className={styles['title-text']}
                value={focusedCardTitleIdx === idx ? focusedCardTitle : card.i}
                onFocus={() => {
                  changeCardTitleValue(idx);
                }}
                onChange={e => {
                  setFocusedCardTitle(e.target.value);
                }}
                onBlur={() => {
                  updateCardTitle(idx);
                }}
              />
              <Card height={card.h * 120 - 24}>
                <div className={styles['card-inner']}>
                  <textarea
                    value={profileCardList[idx].content}
                    onChange={e => {
                      onChangeCardList(e, idx);
                    }}
                    onFocus={() => {
                      setter = setProfileCardList;
                    }}
                    onBlur={resetSetter}
                  />
                </div>
              </Card>
            </div>
          );
        })}
      </GridLayout>
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
                      <input
                        placeholder="link add..."
                        value={snsData.account}
                        onChange={e => {
                          onChangeSnsList(e, idx);
                        }}
                        onFocus={() => {
                          setter = setSnsList;
                        }}
                        onBlur={resetSetter}
                      />
                    </div>
                    <Image
                      src="/icons/delete.svg"
                      width={48}
                      height={48}
                      alt="delete-button"
                      className={styles['close-btn']}
                      onClick={() => {
                        onDeleteSnsItem(idx);
                      }}
                    />
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
      <div className={styles['update-button']} onClick={onUpdateMyProfile}>
        Update
      </div>

      <div className={styles['round-plus-button']}>
        <RoundPlustButton onClickBtn={onCreateCard} />
      </div>
    </div>
  );
}
