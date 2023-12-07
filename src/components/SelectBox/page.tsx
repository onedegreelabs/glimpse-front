import styles from './page.module.scss';

interface Option {
  value: string;
  name: string;
}

interface SelectBoxProps {
  name: string;
  defaultValue: string;
  options: Option[];
  hidden?: boolean;
  hiddenOption?: Option;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectBox({
  name,
  defaultValue,
  options,
  hidden = false,
  hiddenOption,
  onChange,
}: SelectBoxProps) {
  return (
    <select
      className={styles['filtering']}
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
