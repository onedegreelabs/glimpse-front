import {ChangeEvent, useState} from 'react';
import styles from './addInput.module.scss';
interface AddInputProps {
  onClickAddContent: (value: string) => void;
}
export default function AddInput({onClickAddContent}: AddInputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    onClickAddContent(inputValue);
    setInputValue('');
  };

  return (
    <div className={styles['container']}>
      <div className={styles['popup-wrapper']}>
        <div className={styles['popup']}>
          <div className={styles['content-wrapper']}>
            <input
              placeholder="link add..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>done</button>
          </div>
        </div>
      </div>
    </div>
  );
}
