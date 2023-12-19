import styles from './page.module.scss';
import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt: string;
  height: number;
  width: number;
}

export default function Avatar({src, alt, height, width}: AvatarProps) {
  return (
    <div
      className={styles['avatar-image']}
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        style={{width: '100%', height: 'auto'}}
      />
    </div>
  );
}
