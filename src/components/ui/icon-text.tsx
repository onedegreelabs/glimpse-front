import Image from 'next/image';
import styles from './icon-text.module.scss';

interface IcontextProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  text: string;
  textWeight?: number;
  fontsize?: number;
  gap?: number;
}

export default function IconText({
  src,
  alt,
  width,
  height,
  text,
  textWeight,
  fontsize,
  gap,
}: IcontextProps) {
  return (
    <div
      className={styles['icon-text-wrapper']}
      style={{
        ...(gap && {gap: `${gap}px`}),
      }}
    >
      <div style={{width, height}}>
        <Image
          className={styles['icon']}
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
      <span
        style={{
          ...(textWeight && {fontWeight: textWeight}),
          ...(fontsize && {fontSize: `${fontsize}px`}),
        }}
      >
        {text}
      </span>
    </div>
  );
}
