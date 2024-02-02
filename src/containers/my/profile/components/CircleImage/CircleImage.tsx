import styles from './circleImage.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

interface CircleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isAbsolute: boolean;
  onClick?: () => void;
}
export default function CircleImage({
  src,
  alt,
  width,
  height,
  isAbsolute,
  onClick,
}: CircleImageProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles['circle-image'], {
        [styles['absolute-circle-image']]: isAbsolute,
      })}
    >
      <Image src={src} alt={alt} width={width} height={height}></Image>
    </button>
  );
}
