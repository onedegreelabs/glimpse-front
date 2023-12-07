import Image from 'next/image';
import styles from './page.module.scss';

interface IcontextProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: string;
}

export default function IconText({
  src,
  alt,
  width,
  height,
  text,
}: IcontextProps) {
  return (
    <div className={styles['icon-text-wrapper']}>
      <div style={{width, height}}>
        <Image
          className={styles['icon']}
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      <span>{text}</span>
    </div>
  );
}
