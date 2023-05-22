const Form = ({ onSubmit, children, fullWidth }) => (
  <form
    onSubmit={onSubmit}
    className={`${fullWidth ? 'md:w-full' : 'md:w-1/2'} w-full justify-center flex flex-col`}
  >
    {children}
  </form>
);

Form.Row = ({ children }) => (
  <div className="flex flex-col md:flex-row gap-4">{children}</div>
);

Form.Column = ({ children }) => (
  <div className="w-full md:w-1/2">{children}</div>
);

export default Form;
