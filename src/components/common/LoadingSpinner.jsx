import React from 'react';
import { TrendingUp } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-xl animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Excel Analytics</h2>
        <p className="text-gray-600">Please wait while we prepare your dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;