import { styles } from '../styles';

const Action = ({ onClick, icon}) => (
  <button onClick={onClick} className={`py-2 px-4 ${styles.flexCenter}`}>
    <img className="w-8 h-8" src={icon} alt="button icon" />
  </button>
);

export default Action;
