const Filter = ({ children, label }) => (
  <div>
    <h2 className="text-green-700 font-bold mb-4">{label}</h2>
    {children}
  </div>
);

Filter.Header = ({ children }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
    {children}
  </div>
);

Filter.Input = ({ name, value, onChange, placeholder, numeric }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
      placeholder={placeholder}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={name}
      type={numeric ? "number" : "text"}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

Filter.Select = ({ name, value, onChange, options }) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
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

export default Filter;
