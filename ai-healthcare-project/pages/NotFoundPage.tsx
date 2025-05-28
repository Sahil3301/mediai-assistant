import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary-DEFAULT mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Page Not Found</h2>
      <p className="text-neutral-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <a 
        href="/"
        className="px-6 py-2 bg-primary-DEFAULT text-white rounded-lg hover:bg-primary-dark transition-colors"
      >
        Return to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
