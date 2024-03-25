import styles from './button.module.scss';

interface ButtonProps {
  color: string;
  bgColor: string;
  text: string;
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  clickEvent: any;
  borderColor?: string;
}
export default function Button({
  color,
  bgColor,
  text,
  width,
  height,
  children,
  clickEvent,
  borderColor,
}: ButtonProps) {
  return (
    <div
      className={styles['button-wrapper']}
      style={{
        ...(width && {width: `${width}px`}),
        ...(height && {height: `${height}px`}),
        ...(color && {color: `#${color}`}),
        ...(bgColor && {backgroundColor: `#${bgColor}`}),
        ...(borderColor && {border: `1px solid #${borderColor}`}),
      }}
      onClick={() => clickEvent()}
    >
      {children}
      <div className={styles['text-area']}>{text}</div>
    </div>
  );
}
