'use client';

import Select from '@/components/select/Select';
import styles from './filteringWrapper.module.scss';
import {useState} from 'react';

const PERSON_TYPE = [
  {value: 'all', name: 'all'},
  {value: 'host', name: 'host'},
  {value: 'speaker', name: 'speaker'},
];

const INDUSTRY = [
  {value: '프론트엔드', name: '프론트엔드'},
  {value: '백엔드', name: '백엔드'},
  {value: '디자인', name: '디자인'},
  {value: '앱', name: '앱'},
];

const HOBBY = [
  {value: '수영', name: '수영'},
  {value: '등산', name: '등산'},
  {value: '노래', name: '노래'},
];

const INTEREST = [
  {value: '개발', name: '개발'},
  {value: '여행', name: '여행'},
];

const FAVORITE = [
  {value: '과일', name: '과일'},
  {value: '빵', name: '빵'},
  {value: '게임', name: '게임'},
];

export default function FilteringWrapper() {
  const [filters, setFilters] = useState({
    personType: 'all',
    industry: '',
    hobby: '',
    interest: '',
    favorite: '',
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prevFilters => ({...prevFilters, [filterType]: value}));
  };
  return (
    <section className={styles['filtering-area']}>
      <Select
        name="personType"
        defaultValue="all"
        options={PERSON_TYPE}
        value={filters.personType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleFilterChange('personType', e.target.value)
        }
      />
      <Select
        name="industry"
        defaultValue="industry"
        options={INDUSTRY}
        value={filters.industry}
        hidden
        hiddenOption={{value: 'industry', name: 'industry'}}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleFilterChange('industry', e.target.value)
        }
      />
      <Select
        name="hobby"
        defaultValue="hobby"
        options={HOBBY}
        value={filters.hobby}
        hidden
        hiddenOption={{value: 'hobby', name: 'hobby'}}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleFilterChange('hobby', e.target.value)
        }
      />
      <Select
        name={'interest'}
        defaultValue={'interest'}
        options={INTEREST}
        value={filters.interest}
        hidden
        hiddenOption={{value: 'interest', name: 'interest'}}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleFilterChange('interest', e.target.value)
        }
      />
      <Select
        name={'favorite'}
        defaultValue={'favorite'}
        options={FAVORITE}
        value={filters.favorite}
        hidden
        hiddenOption={{value: 'favorite', name: 'favorite'}}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleFilterChange('favorite', e.target.value)
        }
      />
    </section>
  );
}
