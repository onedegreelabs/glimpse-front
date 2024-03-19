import clsx from 'clsx';
import styles from './select.module.scss';

interface Option {
  value: string;
  name: string;
}

interface SelectProps {
  name: string;
  defaultValue: string;
  options: Option[];
  value: string;
  hidden?: boolean;
  hiddenOption?: Option;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  fontsize?: number;
}

export default function Select({
  name,
  defaultValue,
  options,
  value,
  hidden = false,
  hiddenOption,
  onChange,
  fontsize,
}: SelectProps) {
  return (
    <select
      className={clsx(styles['filtering'], {
        [styles['selected-filter']]: value !== '',
      })}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      style={{fontSize: `${fontsize}px`}}
    >
      {hidden && hiddenOption && (
        <option
          value={hiddenOption.value}
          disabled
          hidden
          style={{fontSize: `${fontsize}px`}}
        >
          {hiddenOption.name}
        </option>
      )}
      {options.map((option, index) => (
        <option
          key={`${name}-${index}`}
          value={option.value}
          style={{fontSize: `${fontsize}px`}}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
}
