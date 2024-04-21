'use client';
import {useProfileStore} from '@/stores/profile';
import styles from './page.module.scss';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Image from 'next/image';
import Card from '@/components/card/Card';
import clsx from 'clsx';
import RoundPlustButton from './components/RoundPlustButton';

export default function MyProfilePage() {
  const profile = useProfileStore(state => state.profile);
  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const [aboutMeList, setAboutMeList] = useState(['']);
  const [linkList, setLinkList] = useState(['']);

  let setter: Dispatch<SetStateAction<string[]>> | null;

  const onChangeTargetRef = () => {
    if (setter) {
      setter(prev => [...prev, '']);
    }
  };

  const resetSetter = () => {
    setTimeout(() => {
      setter = null;
    }, 100);
  };

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

      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>Intro</div>
        <div className={styles['card-wrapper']}>
          <Card height={160}>
            <div className={styles['card-inner']}>
              <textarea maxLength={100} placeholder="add title..." />
            </div>
          </Card>
          <Card height={160}>
            <div className={styles['card-inner']}>
              <textarea maxLength={100} placeholder="add career..." />
            </div>
          </Card>
        </div>
      </div>
      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>About me</div>
        <div className={clsx([styles['card-wrapper'], styles['single-card']])}>
          {aboutMeList.map((_, idx) => {
            return (
              <Card height={168} key={idx}>
                <div className={styles['card-inner']}>
                  <textarea
                    onFocus={() => {
                      setter = setAboutMeList;
                    }}
                    onBlur={resetSetter}
                    maxLength={260}
                    placeholder="Write down what you want to say..."
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>Connect</div>
        <div className={clsx([styles['card-wrapper'], styles['single-card']])}>
          {linkList.map((_, idx) => {
            return (
              <Card height={64} key={idx}>
                <div className={styles['card-inner']}>
                  <div className={styles['link-wrapper']}>
                    <div className={styles['empty-link']} />
                    <input
                      onFocus={() => {
                        setter = setLinkList;
                      }}
                      onBlur={resetSetter}
                      placeholder="link add..."
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div className={styles['box-wrapper']}>
        <div className={styles['title-text']}>Hashtag of interest</div>
        <div className={clsx([styles['card-wrapper'], styles['single-card']])}>
          <Card height={384}>
            <div className={styles['card-inner']}>
              <textarea placeholder="Add your interests..." />
            </div>
          </Card>
        </div>
      </div>

      <div className={styles['round-plus-button']}>
        <RoundPlustButton onClickBtn={onChangeTargetRef} />
      </div>
    </div>
  );
}
