const Action = ({ onClick, icon }) => {
  return (
    <button onClick={onClick} className="flex items-center justify-center">
      <span>
        <img className="w-8 h-8" src={icon} alt="button icon" />
      </span>
    </button>
  );
};

export default Action;
