import clsx from 'clsx';
import styles from './selectbox.module.scss';

interface Option {
  value: string;
  name: string;
}

interface SelectBoxProps {
  name: string;
  defaultValue: string;
  options: Option[];
  value: string;
  hidden?: boolean;
  hiddenOption?: Option;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectBox({
  name,
  defaultValue,
  options,
  value,
  hidden = false,
  hiddenOption,
  onChange,
}: SelectBoxProps) {
  return (
    <select
      className={clsx(styles['filtering'], {
        [styles['selected-filter']]: value !== '',
      })}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {hidden && hiddenOption && (
        <option value={hiddenOption.value} disabled hidden>
          {hiddenOption.name}
        </option>
      )}
      {options.map((option, index) => (
        <option key={`${name}-${index}`} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
