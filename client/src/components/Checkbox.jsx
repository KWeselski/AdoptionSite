import { styles } from '../styles';

const Checkbox = ({ label, name, value, handleChange }) => (
  <label className="block">
    <input
      type="checkbox"
      name={name}
      value={value}
      onChange={handleChange}
      className={`mr-2 accent-green-700`}
    />
    {label}
  </label>
);

Checkbox.Multi = ({ label, name, options, values, handleChange }) => (
  <fieldset className={`${styles.flexStart} flex-col `}>
    <legend className="block text-start text-gray-700 text-sm font-bold p-2">
      {label}
    </legend>
    {options.map((option) => (
      <label key={option} className="block">
        <input
          type="checkbox"
          name={name}
          value={option}
          checked={values.includes(option)}
          onChange={handleChange}
          className={`mr-2 accent-green-700`}
        />
        {option}
      </label>
    ))}
  </fieldset>
);

export default Checkbox;
