import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="text-2xl mt-4 text-gray-700">Oops! The page you're looking for does not exist.</p>
      <p className="text-lg mt-2 text-gray-600">It looks like the page you are searching for is not available.</p>

      <div className="mt-8 space-x-4">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Go Back
        </button>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark focus:outline-none focus:ring focus:ring-primaryLight"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
