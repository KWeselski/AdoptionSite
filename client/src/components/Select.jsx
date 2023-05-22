import { styles } from '../styles';

const Select = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col mb-1">
    <label className={styles.label} htmlFor={label}>
      {label}
    </label>
    <select
      className={styles.input}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
