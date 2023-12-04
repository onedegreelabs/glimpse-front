import styles from './page.module.scss';

interface LabelProps {
  label: string;
  backgroundColor?: string;
  borderRadius?: number;
  onDelete?: () => void;
}

export default function Chip({
  label,
  backgroundColor,
  borderRadius,
  onDelete,
}: LabelProps) {
  return (
    <div
      className={styles['chip-wrapper']}
      style={{
        ...(backgroundColor && {backgroundColor: `${backgroundColor}`}),
        ...(borderRadius && {borderRadius: `${borderRadius}px`}),
      }}
    >
      <span>{label}</span>
      {onDelete && <button onClick={onDelete}>X</button>}
    </div>
  );
}
