import { exit } from "../assets";

const Dialog = ({ title, onClose, children }) => {
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:h-1/4">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold m-4">{title}</h1>
              <img
                src={exit}
                alt="exit"
                className="w-6 h-6 m-4 cursor-pointer"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
