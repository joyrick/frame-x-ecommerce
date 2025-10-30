
import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2800); // Slightly less than App's timeout to allow for fade out
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="font-semibold">{message}</span>
    </div>
  );
};
