import { useNavigate } from 'react-router-dom';

const NotAuthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-500">403 - Not Authorized</h1>
        <p className="mt-4 text-gray-600">
          You do not have permission to view this page. Please contact the administrator if you believe this is a
          mistake.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotAuthorized;
