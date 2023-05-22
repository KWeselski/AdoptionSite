import { styles } from '../styles';

const Filter = ({ children, label }) => (
  <div>
    <h2 className="text-green-700 font-bold mb-4">{label}</h2>
    {children}
  </div>
);

Filter.Header = ({ children }) => (
  <div className={`${styles.flexBetween} flex-col sm:flex-row mb-2 gap-2`}>
    {children}
  </div>
);

Filter.Input = ({ name, value, onChange, placeholder, numeric }) => (
  <div className="mb-4">
    <label
      className={styles.label}
      htmlFor={name}
      placeholder={placeholder}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    <input
      className={styles.input}
      id={name}
      type={numeric ? 'number' : 'text'}
      name={name}
      value={value}
      autoComplete="off"
      onChange={onChange}
    />
  </div>
);

Filter.Row = ({ children }) => (
  <div className={`${styles.flexBetween} flex-col sm:flex-row p-4`}>{children}</div>
)

Filter.Select = ({ name, value, onChange, options }) => (
  <div className="mb-4">
    <label
      className={styles.label}
      htmlFor={name}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
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

export default Filter;
