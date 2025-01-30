// src/pages/NotFound.js
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center dark:text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go Back to Home➡️
      </Link>
    </div>
  );
};

export default NotFound;
