const Select = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col mb-1">
    <label
      className="block text-gray-700 text-sm font-bold text-start p-2"
      htmlFor={label}
    >
      {label}
    </label>
    <select
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
