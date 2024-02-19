'use client';

import styles from './searchWrapper.module.scss';
import Image from 'next/image';

interface SearchWrapperProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchWord: string;
}

export default function SearchWrapper({
  onSearch,
  searchWord,
}: SearchWrapperProps) {
  return (
    <div className={styles['search-wrapper']}>
      <input
        type="text"
        placeholder="search..."
        onChange={onSearch}
        value={searchWord}
      />
      <Image
        src="/assets/glimpse-list/search-icon.svg"
        alt="검색 아이콘"
        width={24}
        height={20}
      />
    </div>
  );
}
