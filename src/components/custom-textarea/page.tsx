import styles from './page.module.scss';
interface CustomInputProps {
  name: string;
  value?: string;
  valueArr?: string[];
  handleValue: (value: string) => void;
  placeHolder: string;
}
export default function CustomTextarea({
  name,
  value,
  handleValue,
  placeHolder,
}: CustomInputProps) {
  return (
    <div className={styles['custom-textarea-wrapper']}>
      <div className={styles['name-area']}>{name}</div>
      <textarea
        className={styles['textarea-area']}
        placeholder={placeHolder}
        defaultValue={value}
        onChange={e => {
          handleValue(e.target.value);
        }}
      />
    </div>
  );
}
