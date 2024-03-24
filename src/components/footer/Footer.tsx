'use client';

import styles from './footer.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

interface Footer {
  url: string;
  name: string;
  icon: string;
}

const FOOTER_LINK: Footer[] = [
  {url: '/', name: 'Home', icon: 'home'},
  {url: '/discover', name: 'Discover', icon: 'discover'},
  {url: '/events/my', name: 'My Events', icon: 'calendar'},
  {url: '/my/profile', name: 'My Profile', icon: 'contacts'},
];

export default function Footer() {
  const pathname = usePathname();
  const [isCurrentPage, setIsCurrentPage] = useState('/my/profile');

  useEffect(() => {
    setIsCurrentPage(pathname ?? '/my/profile');
  }, [pathname]);

  return (
    <footer className={styles['footer']}>
      <ul className={styles['footer-container']}>
        {FOOTER_LINK.map(link => (
          <Link key={link.name} href={link.url}>
            <li className={styles['link-wrapper']}>
              <div className={styles['icon-wrapper']}>
                <Image
                  src={`/assets/footer/${
                    isCurrentPage === link.url ? 'solid' : 'outline'
                  }-${link.icon}.svg`}
                  alt={link.name}
                  width={24}
                  height={24}
                />
              </div>
              <p className={styles['icon-name']}>{link.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </footer>
  );
}
