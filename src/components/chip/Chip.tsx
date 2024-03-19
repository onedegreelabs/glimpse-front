import styles from './chip.module.scss';

interface LabelProps {
  label: string;
  height: number;
  backgroundColor?: string;
  borderRadius?: number;
  isOutline?: boolean;
  soldColor?: string;
  onDelete?: (param: any) => void;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

export default function Chip({
  label,
  height,
  backgroundColor,
  borderRadius,
  isOutline = false,
  soldColor,
  onDelete,
  fontSize,
  fontWeight,
  color,
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
      <span
        style={{
          ...(fontSize && {fontSize: `${fontSize}px`}),
          ...(fontWeight && {fontWeight: `${fontWeight}`}),
          ...(color && {color: `${color}`}),
        }}
      >
        {label}
      </span>
      {onDelete && <button onClick={onDelete}>X</button>}
    </div>
  );
}
