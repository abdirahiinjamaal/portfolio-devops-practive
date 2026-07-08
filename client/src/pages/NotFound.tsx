import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
