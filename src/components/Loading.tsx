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
    <div className="flex justify-center flex-col items-center h-full py-28">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      {message && <p className="text-center text-lg mt-5">{message}</p>}
    </div>
  );
};
