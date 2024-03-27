import styles from './avatar.module.scss';
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
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
