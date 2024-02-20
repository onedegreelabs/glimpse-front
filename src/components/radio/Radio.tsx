import styles from './radio.module.scss';
interface Item {
  text: string;
  value: number;
}
interface RadioProps {
  name: string;
  items: Item[];
  value: number;
  handleValue: (value: number) => void;
}
export default function Radio({name, items, value, handleValue}: RadioProps) {
  return (
    <div className={styles['custom-radio-wrapper']}>
      <div className={styles['name-area']}>{name}</div>
      <div className={styles['radio-area']}>
        {items.map((item, index) => (
          <div
            key={`custom_radio_${value}_${index}`}
            className={styles['item-wrapper']}
          >
            <input
              type="radio"
              id={`${name}-${index}`}
              className={styles['radio-btn']}
              name={name}
              value={item.value}
              checked={value === item.value}
              onChange={() => handleValue(item.value)}
            />
            <label
              className={styles['label-area']}
              htmlFor={`${name}-${index}`}
            >
              {item.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
