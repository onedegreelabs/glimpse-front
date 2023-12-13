import styles from './page.module.scss';
interface CustomInputProps {
  name: string;
  value?: string;
  valueArr?: string[];
  handleValue: (value: string) => void;
  placeHolder: string;
}
export default function CustomInput({
  name,
  value,
  handleValue,
  placeHolder,
}: CustomInputProps) {
  return (
    <div className={styles['custom-input-wrapper']}>
      <div className={styles['name-area']}>{name}</div>
      <input
        className={styles['input-area']}
        placeholder={placeHolder}
        defaultValue={value}
        onChange={e => {
          handleValue(e.target.value);
        }}
      />
    </div>
  );
}
