import { styles } from '../styles';

const TextArea = ({ label, name, value, onChange }) => (
  <div className="flex flex-col mb-1">
    <label className={styles.label} htmlFor={label}>
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  </div>
);

export default TextArea;
