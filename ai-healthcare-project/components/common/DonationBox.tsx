import React, { useState } from 'react';

const DonationBox: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  
  return (
    <div className="donation-box relative">
      <button 
        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        onMouseEnter={() => setShowQR(true)}
        onMouseLeave={() => setShowQR(false)}
        onClick={() => setShowQR(!showQR)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
        </svg>
        Support This Project
      </button>
      
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" 
             onClick={() => setShowQR(false)}>
          <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 max-w-md mx-auto" 
               onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center">
              <p className="text-lg font-medium text-gray-700 mb-4">Scan to donate</p>
              <div className="flex justify-center w-full">
                <img 
                  src="/images/donation-qr.png" 
                  alt="Donation QR Code" 
                  className="w-full h-auto" 
                  style={{ maxWidth: '350px', minWidth: '320px', aspectRatio: '1/1' }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-4">Thank you for supporting our work!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationBox;
