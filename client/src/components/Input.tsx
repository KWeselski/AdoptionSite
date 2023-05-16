const Input = ({ name, placeholder, value, onChange, icon }) => {
  return (
    <div className="flex items-center bg-white rounded-full shadow-md">
      {icon && (
        <div className="p-2">
          <i className={icon}></i>
        </div>
      )}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-r-full focus:outline-none"
      />
    </div>
  );
};

export default Input;
