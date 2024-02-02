import styles from './saveButton.module.scss';

interface SaveButtonProps {
  isSaving?: boolean;
  onSave?: () => void;
}

// TODO: 전역상태에 포함 시킬지 고민이 필요
export default function SaveButton({isSaving, onSave}: SaveButtonProps) {
  return (
    <button className={styles['save-button']} onClick={onSave}>
      <span>{`${!isSaving ? 'SAVE' : 'SAVING'}`}</span>
    </button>
  );
}
