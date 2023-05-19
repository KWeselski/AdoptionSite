const Checkbox = ({ label, name, options, values, handleChange}) => (
    <fieldset className="flex flex-col items-start">
      <legend className="block text-start text-gray-700 text-sm font-bold p-2" >{label}</legend>
      {options.map(option => (
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