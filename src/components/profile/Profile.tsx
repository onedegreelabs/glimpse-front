'use client';
import styles from './profile.module.scss';

import IconText from '@/components/iconText/IconText';
import {TProfile, TempPropfile} from '@/types/profileType';
import {cn} from '@/lib/utils';
import {Input} from '../ui/input';
import {useProfileStore} from '@/stores/profile';
import {DEPARTMENT} from '@/containers/my/profile/constans/profile';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Props {
  profile: TempPropfile;
}

function Profile({profile}: Props) {
  const {
    familyName,
    givenName,
    introduction,
    department,
    belong,
    regionId,
    isOtherProfile,
  } = profile;
  const {setChangeProfile} = useProfileStore();

  return (
    <section className={styles['profile-info-wrapper']}>
      <div className={styles['name-wrapper']}>
        {isOtherProfile ? (
          <p>{`${familyName} ${givenName} `}</p>
        ) : (
          <>
            <Input
              name="familyName"
              type="text"
              placeholder="lastName"
              className={cn(
                'border-solid border-[#D9D9D9] text-[24px] text-center font-normal'
              )}
              maxLength={10}
              value={familyName}
              onChange={e => {
                const name = e.target.name;
                const value = e.target.value;
                setChangeProfile({name, value});
              }}
            />
            <Input
              name="givenName"
              type="text"
              placeholder="firstName"
              className={cn(
                'border-solid border-[#D9D9D9] text-[24px] text-center font-normal'
              )}
              maxLength={10}
              value={givenName}
              onChange={e => {
                const name = e.target.name;
                const value = e.target.value;
                setChangeProfile({name, value});
              }}
            />
          </>
        )}
      </div>
      <div>
        {isOtherProfile ? (
          <p>{introduction}</p>
        ) : (
          <Input
            name="introSnippet"
            type="text"
            placeholder="add bio..."
            className={cn('h-[16px] text-[12px] text-center')}
            maxLength={20}
            value={introduction}
            onChange={e => {
              const name = e.target.name;
              const value = e.target.value;
              setChangeProfile({name, value});
            }}
          />
        )}
      </div>
      <div className={styles['company-wrapper']}>
        {isOtherProfile ? (
          <>
            <p className={styles['company-text']}>{department}</p>
            <p className={styles['divider']}>|</p>
            <p className={styles['company-text']}>{belong}</p>
          </>
        ) : (
          <>
            <div style={{width: '166px'}}>
              <Select
                name="department"
                value={department}
                onValueChange={value => {
                  const name = 'department';
                  setChangeProfile({name, value});
                }}
              >
                <SelectTrigger className="h-[24px] py-[4px] px-[10px] border border-solid border-[#D9D9D9] rounded-[4px] text-[12px] focus:ring-[#7E51FD] outline-offset-0">
                  <SelectValue placeholder="department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENT.map(department => (
                    <SelectItem
                      key={department}
                      value={department}
                      className="text-[12px]"
                    >
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className={styles['divider']}>|</p>
            <div style={{width: '166px'}}>
              <Input
                name="belong"
                type="text"
                placeholder="company"
                className={cn(
                  'w-[72px] h-[24px] border-solid border-[#D9D9D9] text-[12px]'
                )}
                maxLength={15}
                value={belong}
                onChange={e => {
                  const name = e.target.name;
                  const value = e.target.value;
                  setChangeProfile({name, value});
                }}
              />
            </div>
          </>
        )}
      </div>
      <div className={'relative'}>
        <div className="absolute pl-[10px] inset-y-0 start-0 flex items-center pointer-events-none">
          <IconText
            src="/assets/glimpse-list/location-icon.svg"
            alt="위치아이콘"
            width={16}
            height={16}
            text={''}
          />
        </div>
        <Input
          name="regionId"
          type="text"
          className="max-w-[110px] h-[20px] py-[4px] px-[10px] ps-[32px] border-solid border-[#D9D9D9] text-[12px]"
          value={regionId}
          onChange={e => {
            const name = e.target.name;
            const value = e.target.value;
            setChangeProfile({name, value});
          }}
        />
      </div>
    </section>
  );
}

export default Profile;
