import { Link } from 'react-router-dom';

import LoginForm from '../forms/LoginForm';

const Login = () => (
  <div className=" flex justify-center h-screen">
    <div className="bg-white mt-0 md:mt-20 p-8 rounded shadow-md w-96 sm:h-[420px]">
      <h2 className="text-2xl font-bold mb-8 text-center">Sign up</h2>
      <LoginForm />
      <div>
        <p className="text-center mt-4">You don't have account yet?</p>
        <Link to="/register" className="text-blue-500 underline">
          Register now
        </Link>
      </div>
    </div>
  </div>
);

export default Login;
