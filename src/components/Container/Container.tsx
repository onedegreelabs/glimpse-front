import styles from './container.module.scss';

interface ContianerProps {
  children: React.ReactNode;
}

export default function Container({children}: ContianerProps) {
  return <div className={styles['container']}>{children}</div>;
}
