import styles from './page.module.scss';

interface ButtonProps {
  color: string;
  bgColor: string;
  text: string;
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  clickEvent: any;
}
export default function Button({
  color,
  bgColor,
  text,
  width,
  height,
  children,
  clickEvent,
}: ButtonProps) {
  return (
    <div
      className={styles['button-wrapper']}
      style={{
        ...(width && {width: `${width}px`}),
        ...(height && {height: `${height}px`}),
        ...(color && {color: `#${color}`}),
        ...(bgColor && {backgroundColor: `#${bgColor}`}),
      }}
      onClick={() => clickEvent()}
    >
      {children}
      <div className={styles['text-area']}>{text}</div>
    </div>
  );
}
