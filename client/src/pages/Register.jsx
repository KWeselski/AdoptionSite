import { Link } from 'react-router-dom';

import RegisterForm from '../forms/RegisterForm';
import styles from '../styles';

const Register = () => (
  <div className="flex items-center justify-center">
    <div className=" bg-white mt-0 md:mt-20 p-8 rounded shadow-md w-96 sm:min-h-[425px]">
      <h2 className={styles.h2}>Register</h2>
      <RegisterForm />
      <div>
        <p className="text-center mt-4">You have account already?</p>
        <Link to="/login" className="text-blue-500 underline">
          Sign up
        </Link>
      </div>
    </div>
  </div>
);

export default Register;
