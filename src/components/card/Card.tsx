import styles from './card.module.scss';

interface CardProps {
  height?: string | number;
  width?: string | number;
  children?: React.ReactNode;
}

export default function Card({ width, height, children }: CardProps) {
  return (
    <div
      className={styles['card-wrapper']}
      style={{
        ...(height && { height: `${height}px` }),
        ...(width ? { width: `${width}px` } : { width: '100%' })
      }}
    >
      {children}
    </div>
  );
}
