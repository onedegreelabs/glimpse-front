import styles from './saveButton.module.scss';

interface SaveButtonProps {
  isSaving: boolean;
  onSave: () => void;
}

export default function SaveButton({isSaving, onSave}: SaveButtonProps) {
  return (
    <button className={styles['save-button']} onClick={onSave}>
      <span>{`${!isSaving ? 'SAVE' : 'SAVING'}`}</span>
    </button>
  );
}
