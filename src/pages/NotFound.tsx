import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
          <a href="/" className="text-white">
            Return to Home
          </a>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
