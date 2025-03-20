import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You do not have permission to view this page.</p>
        <Link to="/dashboard" className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-300">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
