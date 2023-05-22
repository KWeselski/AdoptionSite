import { styles } from '../styles';

const Input = ({ label, name, placeholder, value, onChange, icon, tel }) => (
  <div className="flex flex-col mb-1">
    <label className={styles.label} htmlFor={label} placeholder={placeholder}>
      {label}
    </label>
    <input
      type={tel ? 'tel' : 'text'}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  </div>
);

export default Input;
