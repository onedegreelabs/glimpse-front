import styles from './chip.module.scss';

interface PaddingProps {
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}
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
  padding?: PaddingProps;
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
  padding,
}: LabelProps) {
  return (
    <div
      className={styles['chip-wrapper']}
      style={{
        height,
        ...(backgroundColor && {backgroundColor: `${backgroundColor}`}),
        ...(borderRadius && {borderRadius: `${borderRadius}px`}),
        ...(isOutline && {border: `1px solid ${soldColor}`}),
        ...(padding?.paddingTop && {paddingTop: `${padding.paddingTop}px`}),
        ...(padding?.paddingBottom && {
          paddingBottom: `${padding.paddingBottom}px`,
        }),
        ...(padding?.paddingLeft && {paddingLeft: `${padding.paddingLeft}px`}),
        ...(padding?.paddingRight && {
          paddingRight: `${padding.paddingRight}px`,
        }),
      }}
    >
      <span
        style={{
          ...(fontSize && {fontSize: `${fontSize}px`}),
          ...(fontWeight && {fontWeight: `${fontWeight}`}),
        }}
      >
        {label}
      </span>
      {onDelete && <button onClick={onDelete}>X</button>}
    </div>
  );
}
