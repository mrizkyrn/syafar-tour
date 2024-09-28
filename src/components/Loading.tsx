import React from 'react';

interface TableLoadingProps {
  rows?: number;
  columns?: number;
}

export const TableLoading: React.FC<TableLoadingProps> = ({ rows = 5, columns = 5 }) => {
  return (
    <tbody>
      {[...Array(rows)].map((_, index) => (
        <tr key={index}>
          <td colSpan={columns} className="text-center py-3 px-4">
            <div className='animate-pulse bg-gray-300 h-6'></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

interface SpinnerLoadingProps {
  message?: string;
}

export const SpinnerLoading: React.FC<SpinnerLoadingProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-6 h-6 border-2 border-t-2 border-gray-300 rounded-full animate-spin"></div>
      {message && <span className="ml-2">{message}</span>}
    </div>
  );
};
