import {Dispatch, SetStateAction, useRef, useState} from 'react';
import styles from './addInput.module.scss';
interface AddInputProps {
  onClickAddContent: (value: string) => void;
  setIsShowAddInput: Dispatch<SetStateAction<boolean>>;
}
export default function AddInput({
  onClickAddContent,
  setIsShowAddInput,
}: AddInputProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const clickModalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      setIsShowAddInput(false);
      document.body.style.overflow = 'unset';
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    onClickAddContent(inputValue);
    setInputValue('');
  };

  return (
    <div className={styles['container']}>
      <div
        className={styles['popup-wrapper']}
        ref={modalRef}
        onClick={clickModalOutSideClick}
      >
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
