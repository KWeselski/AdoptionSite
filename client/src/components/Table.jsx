import React from 'react';

const Table = ({ children }) => (
  <div className="w-full bg-white border border-gray-200 overflow-x-auto sm:overflow-visible">
    <div className="sm:table w-full sm:table-auto">{children}</div>
  </div>
);

Table.Header = ({ children, size = 1 }) => (
  <div
    className={`sm:table-cell px-4 py-2 font-bold bg-gray-100 border-b sm:w-1/${size}`}
  >
    {children}
  </div>
);

Table.Row = ({ children, size = 5 }) => (
  <div className="sm:table-row-group">
    <div className="sm:table-row border-y-2">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { size: size });
      })}
    </div>
  </div>
);

Table.Cell = ({ children, size = 1, primary = false }) => (
  <div
    className={`sm:table-cell px-2 py-2 sm:border-b ${
      primary ? 'text-green-700 font-bold' : 'font-normal'
    } sm:w-1/${size}} `}
  >
    <p className="flex justify-center text-center">{children}</p>
  </div>
);

Table.Actions = ({ children, size = 1 }) => (
  <div className={`sm:table-cell px-4 py-2 sm:border-b sm:w-1/${size}}`}>
    <div className="flex flex-row items-center justify-center">{children}</div>
  </div>
);

Table.Data = ({ label, children }) => (
  <div key={label} className="flex w-full py-2 border-b text-start items-start">
    <div className="w-1/3 font-semibold">{label}</div>
    <div className="w-2/3">{children}</div>
  </div>
);

export default Table;
