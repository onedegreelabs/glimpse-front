import styles from './page.module.scss';

interface LabelProps {
  label: string;
  backgroundColor?: string;
  borderRadius?: number;
  isOutline?: boolean;
  soldColor?: string;
  onDelete?: () => void;
}

export default function Chip({
  label,
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
