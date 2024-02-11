import styles from './custom-input.module.scss';
interface CustomInputProps {
  name: string;
  value?: string;
  valueArr?: string[];
  handleValue?: (value: string) => void;
  placeHolder: string;
  handleEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export default function CustomInput({
  name,
  value,
  handleValue,
  placeHolder,
  handleEnter,
}: CustomInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleValue) {
      handleValue(e.target.value);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && handleEnter) {
      handleEnter(e);
    }
  };
  return (
    <div className={styles['custom-input-wrapper']}>
      <div className={styles['name-area']}>{name}</div>
      <input
        className={styles['input-area']}
        placeholder={placeHolder}
        defaultValue={value}
        onChange={handleValue ? handleChange : undefined}
        onKeyDown={e => {
          handleKeyDown(e);
        }}
      />
    </div>
  );
}
