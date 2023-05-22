import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../components';
import LoginForm from '../forms/LoginForm';
import { login, logout } from '../redux/actions/auth';
import styles from '../styles';

const SignUp = ({ handleLogin }) => (
  <>
    <h2 className={styles.h2}>Sign up</h2>
    <LoginForm handleLogin={handleLogin} />
    <div>
      <p className="text-center mt-4">You don't have account yet?</p>
      <Link to="/register" className="text-blue-500 underline">
        Register now
      </Link>
    </div>
  </>
);

const LoggedIn = ({ handleLogout }) => (
  <>
    <h2 className={styles.h2}>You're logged in</h2>
    <p className="text-center mt-4">What do you want to do?</p>
    <div className="flex justify-center mt-4">
      <Link to="/">
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Link>
    </div>
  </>
);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogin = ({ email, password }) => {
    dispatch(login(email, password));
    navigate('/');
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className=" flex justify-center h-screen">
      <div className="bg-white mt-0 md:mt-20 p-8 rounded shadow-md w-96 sm:h-[420px]">
        {token ? (
          <LoggedIn handleLogout={handleLogout} />
        ) : (
          <SignUp handleLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};
export default Login;
