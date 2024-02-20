import styles from './textArea.module.scss';
interface TextAreaProps {
  name: string;
  value?: string;
  valueArr?: string[];
  handleValue: (value: string) => void;
  placeHolder: string;
}
export default function TextArea({
  name,
  value,
  handleValue,
  placeHolder,
}: TextAreaProps) {
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
