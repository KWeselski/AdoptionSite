const TextArea = ({ label, name, value, onChange }) => (
  <div className="flex flex-col mb-1">
    <label
      className="block text-start text-gray-700 text-sm font-bold p-2"
      htmlFor={label}
    >
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="shadow min-h-[120px] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default TextArea;
