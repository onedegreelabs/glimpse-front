import styles from './page.module.scss';

interface LabelProps {
  label: string;
  height: number;
  backgroundColor?: string;
  borderRadius?: number;
  isOutline?: boolean;
  soldColor?: string;
  onDelete?: (param: any) => void;
}

export default function Chip({
  label,
  height,
  backgroundColor,
  borderRadius,
  isOutline = false,
  soldColor,
  onDelete,
}: LabelProps) {
  return (
    <div
      className={styles['chip-wrapper']}
      style={{
        height,
        ...(backgroundColor && {backgroundColor: `${backgroundColor}`}),
        ...(borderRadius && {borderRadius: `${borderRadius}px`}),
        ...(isOutline && {border: `1px solid ${soldColor}`}),
      }}
    >
      <span>{label}</span>
      {onDelete && <button onClick={onDelete}>X</button>}
    </div>
  );
}
