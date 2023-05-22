import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../redux/actions/errors';

const ErrorAlert = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errors.error);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!error) {
    return null;
  }

  return (
    <div className="flex justify-center animate-bounce">
      <div className="bg-red-500 w-[300px] justify-center text-white px-4 py-2 rounded-md">
        {error}
      </div>
    </div>
  );
};

export default ErrorAlert;
