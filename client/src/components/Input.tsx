const Input = ({ label, name, placeholder, value, onChange, icon }) => (
  <div className="flex flex-col mb-1">
    <label
      className="block text-start text-gray-700 text-sm font-bold p-2"
      htmlFor={label}
      placeholder={placeholder}
    >
      {label}
    </label>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default Input;
