import styles from './page.module.scss';

interface CardProps {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
}

export default function Card({width, height, children}: CardProps) {
  return (
    <div
      className={styles['card-wrapper']}
      style={{
        ...(width && {width: `${width}px`}),
        ...(height && {height: `${height}px`}),
      }}
    >
      {children}
    </div>
  );
}
