import styles from './saveButton.module.scss';

interface SaveButtonProps {
  isSaving: boolean;
}

export default function SaveButton({isSaving}: SaveButtonProps) {
  return (
    <button className={styles['save-button']}>
      <span>{`${!isSaving ? 'SAVE' : 'SAVING'}`}</span>
    </button>
  );
}
